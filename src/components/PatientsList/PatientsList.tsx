import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { fetchPatients } from '../../redux/thunks/patientsThunks';
import { PatientsState, Patient } from '../../redux/slices/patientsSlice';
import { RootState } from 'redux/rootReducer';
import PatientCard from '../PatientCard/PatientCard';
import { Typography, List, ListItem, Divider } from '@mui/material';

const PatientsList: React.FC = () => {
  const dispatch =
    useDispatch<ThunkDispatch<PatientsState, unknown, AnyAction>>();
  const patientsDataFromSelector = useSelector(
    (state: RootState) => state.patients
  );
  const [patientsData, setPatientsData] = useState<Patient[]>(
    patientsDataFromSelector.patients || []
  );

  useEffect(() => {
    dispatch(fetchPatients()).then(() => {
      setPatientsData(patientsDataFromSelector.patients || []);
    });
  }, [dispatch, patientsDataFromSelector.patients]);

  const handleSave = (updatedPatient: Patient) => {
    const updatedPatients = patientsData.map((patient) =>
      patient.id === updatedPatient.id ? updatedPatient : patient
    );
    setPatientsData(updatedPatients);
  };

  return (
    <div>
      <Typography variant='h3'>Patients List</Typography>
      <List>
        {patientsData.map((patient) => (
          <ListItem key={patient.id}>
            <PatientCard patient={patient} onSave={handleSave} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PatientsList;
