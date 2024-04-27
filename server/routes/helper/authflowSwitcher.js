var axios = require('axios');

function choiceIsAvailable(result, choice) {
  let filter = result.flow_choices.filter(function (fc) {
    return fc.choice === choice;
  });

  return filter.length > 0;
}

function parseAuthResult(summary, authData) {
  if (summary === 'Allowed' || summary === 'Success') {
    return {
      status: 'success',
      refresh_token: {
        token: authData.result.refresh_token.token,
        expire: authData.result.refresh_token.expire,
      },
      access_token: {
        token: authData.result.active_token.token,
        expire: authData.result.active_token.expire,
      },
      user: {
        first_name: authData.result.active_token.profile.first_name,
        last_name: authData.result.active_token.profile.last_name,
        email: authData.result.active_token.email,
        id: authData.result.refresh_token.identity,
      },
    };
  } else {
    return {
      status: 'unauthorized',
      message: 'User is not allowed to proceed',
    };
  }
}

async function authFlow(flowType, data) {
  const pangeaSDK = await import('pangea-node-sdk'); // Dynamic import
  const { PangeaConfig, AuthNService, PangeaErrors, AuthN } = pangeaSDK; // Destructure after import

  try {
    const config = new PangeaConfig({ domain: 'aws.us.pangea.cloud' });
    const CB_URI = '/login-success';

    // Helper function, have to put it inside because AuthN is only imported in runtime
    async function flowHandlePasswordPhase(authn, flow_id, password) {
      console.log('Update flow with password');
      const response = await authn.flow.update({
        flow_id: flow_id,
        choice: AuthN.Flow.Choice.PASSWORD,
        data: {
          password: password,
        },
      });
      return response.result;
    }

    async function flowHandleProfilePhase(authn, flow_id, profile) {
      console.log('Update flow with profile');
      const response = await authn.flow.update({
        flow_id,
        choice: AuthN.Flow.Choice.PROFILE,
        data: {
          profile: profile,
        },
      });
      return response.result;
    }

    /**************************Flow Start*********************************** */
    console.log('start flow');
    const authn = new AuthNService(process.env.PANGEA_TOKEN, config);
    const startResp = await authn.flow.start({
      email: data.email,
      flow_types: [AuthN.FlowType.SIGNUP, AuthN.FlowType.SIGNIN],
      cb_uri: CB_URI,
    });

    const flow_id = startResp.result.flow_id;
    let result = startResp.result;
    console.log('auth type is' + flowType);
    switch (flowType) {
      case 'SIGN_UP':
        const profile = { first_name: data.firstname, last_name: data.lastname };

        while (result.flow_phase != 'phase_completed') {
          if (choiceIsAvailable(result, AuthN.Flow.Choice.PASSWORD)) {
            result = await flowHandlePasswordPhase(authn, flow_id, data.password);
          } else if (choiceIsAvailable(result, AuthN.Flow.Choice.PROFILE)) {
            result = await flowHandleProfilePhase(authn, flow_id, profile);
          } else {
            console.log(`Phase ${result.flow_phase} not handled`);
            break;
          }
        }
        console.log('Complete signup/signin flow');
        const signUPResp = await authn.flow.complete(flow_id);
        console.log('Flow is complete');

        console.log('Sign up success. Result: ', signUPResp.result);

        console.log('Assigning Roles to userid', signUPResp.result.refresh_token.identity);

        const assignRoleRequest = {
          tuples: [
            {
              subject: { namespace: 'user', id: signUPResp.result.refresh_token.identity },
              relation: 'Physician',
              resource: { namespace: 'role' },
            },
          ],
        };
        // @ts-ignore
        const assignRoleResponse = await axios.post(
          'https://authz.aws.us.pangea.cloud/v1beta/tuple/create',
          assignRoleRequest,
          {
            headers: {
              Authorization: `Bearer ${process.env.PANGEA_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Response for assign:', assignRoleResponse.data); // Check the data

        return parseAuthResult(assignRoleResponse.data.summary, signUPResp);

      case 'SIGN_IN':
        while (result.flow_phase != 'phase_completed') {
          if (choiceIsAvailable(result, AuthN.Flow.Choice.PASSWORD)) {
            result = await flowHandlePasswordPhase(authn, flow_id, data.password);
          } else if (choiceIsAvailable(result, AuthN.Flow.Choice.PROFILE)) {
            result = await flowHandleProfilePhase(authn, flow_id, profile);
          } else {
            console.log(`Phase ${result.flow_phase} not handled`);
            break;
          }
        }
        console.log('Complete signin flow');
        const signINResp = await authn.flow.complete(flow_id);
        console.log('Flow is complete');
        console.log('Sign up success. Result: ', signINResp.result);

        // Send a POST request to the specified URL
        const checkPermissionRequestBody = {
          resource: {
            namespace: 'Applications',
          },
          action: 'PhysicianPortal',
          subject: {
            namespace: 'user',
            id: signINResp.result.refresh_token.identity,
          },
        };

        // @ts-ignore
        const checkPermissionResponse = await axios.post(
          'https://authz.aws.us.pangea.cloud/v1beta/check',
          checkPermissionRequestBody,
          {
            headers: {
              Authorization: `Bearer ${process.env.PANGEA_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('permission:', checkPermissionResponse.data);
        return parseAuthResult(checkPermissionResponse.data.summary, signINResp);
      default:
        break;
    }
  } catch (error) {
    if (error instanceof PangeaErrors.APIError) {
      console.log('Something went wrong...');
      console.log(error.toString());
    }
    throw error;
  }
}

module.exports = authFlow;
