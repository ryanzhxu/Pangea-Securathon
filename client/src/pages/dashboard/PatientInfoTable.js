import React from 'react';

const PatientInfoTable = (patientInfo) => {
  if (!patientInfo) {
    return null;
  }
  console.log(patientInfo);
  return (
    <table>
      <tbody>
        {/* {Object.entries(patientInfo).map(([key, value]) => {
          if (key === '_id' || key === '__v') {
            return null; // Skip these keys
          }

          // Special case for health metrics to be tracked
          if (key === 'healthMetricsToBeTracked') {
            value = value.filter((metric) => metric !== '').join(', ');
          }

          return (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          );
        })} */}

        <tr key={patientInfo._id}>
          <td>Name</td>
          <td>{patientInfo.name}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default PatientInfoTable;
