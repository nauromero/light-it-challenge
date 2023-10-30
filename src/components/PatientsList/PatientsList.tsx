import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { v4 as uuidv4 } from 'uuid';

import {
  fetchPatients,
  addPatient,
  editPatient,
} from '../../redux/thunks/patientsThunks';
import {
  PatientType,
  EditablePatientFields,
} from '../../types';
import { RootState } from 'redux/rootReducer';
import PatientCard from '../PatientCard/PatientCard';
import { Typography, ListItem, CircularProgress, Button } from '@mui/material';
import { StyledList, Container, LoaderContainer } from './styles';
import { PATIENTS_CONSTANTS } from '../../constants/patientsConstants';
import PatientsModal from '../PatientsModal/PatientsModal';

const PatientsList: React.FC = () => {
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();

  const patientsDataFromSelector = useSelector(
    (state: RootState) => state.patients
  );

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const handleSave = (updatedPatient: EditablePatientFields) => {
    dispatch(editPatient(updatedPatient));
  };

  const handleAdd = (newPatient: PatientType) => {
    const newPatientWithDateAndId = {
      ...newPatient,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    dispatch(addPatient(newPatientWithDateAndId));
  };

  return (
    <Container>
      <Typography variant='h3'>{PATIENTS_CONSTANTS.PATIENTS_LIST}</Typography>
      <Button
        onClick={() => {
          setIsAddPatientModalOpen(true);
        }}>
        {PATIENTS_CONSTANTS.ADD}
      </Button>
      {patientsDataFromSelector.loading ? (
        <LoaderContainer>
          <CircularProgress />
        </LoaderContainer>
      ) : (
        <StyledList>
          {patientsDataFromSelector.patients.map((patient: PatientType) => (
            <ListItem key={patient.id}>
              <PatientCard patient={patient} onSave={handleSave} isLoading={patientsDataFromSelector.loading}/>
            </ListItem>
          ))}
        </StyledList>
      )}
      <PatientsModal
        mode={PATIENTS_CONSTANTS.ADD}
        isModalOpen={isAddPatientModalOpen}
        setIsModalOpen={setIsAddPatientModalOpen}
        onSubmit={handleAdd}
      />
    </Container>
  );
};

export default PatientsList;
