var express = require('express');
var axios = require('axios');
var app = express();

/**
 * @param {{ flow_choices: any[]; }} result
 * @param {any} choice
 */
function choiceIsAvailable(result, choice) {
  let filter = result.flow_choices.filter(function (fc) {
    return fc.choice === choice;
  });

  return filter.length > 0;
}

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  (async () => {
    try {
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

      /*************************Authentication Flow**************************** */
      const pangeaSDK = await import('pangea-node-sdk'); // Dynamic import
      const { PangeaConfig, AuthNService, PangeaErrors, AuthN } = pangeaSDK; // Destructure after import

      const token = 'pts_v4popw45dg4aeizeijkty3l2p2h6fewe';
      const config = new PangeaConfig({ domain: 'aws.us.pangea.cloud' });
      const CB_URI = '/login-success';

      const authn = new AuthNService(token, config);
      const startResp = await authn.flow.start({
        email: email,
        flow_types: [AuthN.FlowType.SIGNIN],
        cb_uri: CB_URI,
      });

      const flow_id = startResp.result.flow_id;
      let result = startResp.result;

      while (result.flow_phase != 'phase_completed') {
        if (choiceIsAvailable(result, AuthN.Flow.Choice.PASSWORD)) {
          result = await flowHandlePasswordPhase(authn, flow_id, password);
        } else {
          console.log(`Phase ${result.flow_phase} not handled`);
          break;
        }
      }

      console.log('Complete signup/signin flow');
      const completeResp = await authn.flow.complete(flow_id);
      console.log('Flow is complete');

      console.log('Login success. Result: ', completeResp.result);

      /*************************Authorization Flow**************************** */
      // There's no node modules for Pangea AuthZ yet, so have to use fetch request

      // Send a POST request to the specified URL
      const requestBody = {
        resource: {
          namespace: 'Applications',
        },
        action: 'MediSync',
        subject: {
          namespace: 'user',
          id: completeResp.result.refresh_token.identity,
        },
      };

      // @ts-ignore
      const response = await axios.post('https://authz.aws.us.pangea.cloud/v1beta/check', requestBody, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token to headers
          'Content-Type': 'application/json',
        },
      });

      console.log('permission:', response.data);
      const summary = response.data.summary; // Extract the 'summary' field from the response

      if (summary === 'Allowed') {
        res.json({
          status: 'success',
          refresh_token: {
            token: completeResp.result.refresh_token.token,
            expire: completeResp.result.refresh_token.expire,
          },
          access_token: {
            token: completeResp.result.active_token.token,
            expire: completeResp.result.active_token.expire,
          },
          user: {
            first_name: completeResp.result.active_token.profile.first_name,
            last_name: completeResp.result.active_token.profile.last_name,
            email: completeResp.result.active_token.email,
          },
        });
      } else {
        res.status(401).json({
          status: 'unauthorized',
          message: 'User is not allowed to proceed',
        });
      }
    } catch (error) {
      res.status(401).json({ status: 'error', message: error.message });
    }
  })();
});

module.exports = app;
