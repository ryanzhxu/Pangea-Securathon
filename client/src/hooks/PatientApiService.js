import SERVER_BASE_URL from '../config';

const getPatients = async () => {
  const resp = await fetch(`${SERVER_BASE_URL}/patients`, {
    method: 'GET',
  });

  return resp.json();
};

const getPatientsByPhysicianId = async (physicianId) => {
  const resp = await fetch(`${SERVER_BASE_URL}/physicians/${physicianId}/patients`, {
    method: 'GET',
  });

  return resp.json();
};

const getPatientOverviewInfo = async (patientId) => {
  const resp = await fetch(`${SERVER_BASE_URL}/patients/${patientId}?isOverviewPage=true`, {
    method: 'GET',
  });

  return resp.json();
};

const addPatient = async (patient) => {
  try {
    const formData = new FormData();
    Object.entries(patient).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch(`${SERVER_BASE_URL}/patients`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to add patient');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const PatientApiService = {
  getPatients,
  getPatientsByPhysicianId,
  getPatientOverviewInfo,
  addPatient,
};

export default PatientApiService;

