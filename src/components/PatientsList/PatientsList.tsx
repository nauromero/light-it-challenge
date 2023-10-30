import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
  fetchPatients,
  addPatient,
  editPatient,
} from '../../redux/thunks/patientsThunks';
import { Patient, EditablePatientFields } from '../../redux/slices/patientsSlice';
import { RootState } from 'redux/rootReducer';
import PatientCard from '../PatientCard/PatientCard';
import { Typography, ListItem, CircularProgress, Button } from '@mui/material';
import { StyledList, Container, LoaderContainer } from './styles';
import { TEXT_CONSTANTS } from '../patientCardTexts';
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

  const handleAdd = (newPatient: Patient) => {
    dispatch(addPatient(newPatient));
  };

  return (
    <Container>
      <Typography variant='h3'>Patients List</Typography>
      <Button
        onClick={() => {
          setIsAddPatientModalOpen(true);
        }}>
        {TEXT_CONSTANTS.ADD}
      </Button>
      {patientsDataFromSelector.loading ? (
        <LoaderContainer>
          <CircularProgress />
        </LoaderContainer>
      ) : (
        <StyledList>
          {patientsDataFromSelector.patients.map((patient) => (
            <ListItem key={patient.id}>
              <PatientCard patient={patient} onSave={handleSave} />
            </ListItem>
          ))}
        </StyledList>
      )}
      <PatientsModal
        mode={TEXT_CONSTANTS.ADD}
        isModalOpen={isAddPatientModalOpen}
        setIsModalOpen={setIsAddPatientModalOpen}
        onSubmit={() => handleAdd}
      />
    </Container>
  );
};

export default PatientsList;
