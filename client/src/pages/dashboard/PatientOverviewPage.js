import { useState, useEffect } from 'react';
import PatientApiService from '../../hooks/PatientApiService';
import PatientInfoTable from './PatientInfoTable';
import React from 'react';

const PatientOverviewPage = (patientId) => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    // Fetch patients when the component mounts
    const fetchPatients = async () => {
      try {
        const patientsData = await PatientApiService.getPatientOverviewInfo("662558593826322834649c8f");
        setPatient(patientsData);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []); // Empty dependency array means this effect runs only once on mount

  return <PatientInfoTable patientInfo={patient} />;
};

export default PatientOverviewPage;
