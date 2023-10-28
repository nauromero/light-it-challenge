import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { fetchPatients } from '../redux/thunks/patientsThunks'; 
import { PatientsState } from '../redux/slices/patientsSlice';
import { RootState } from 'redux/rootReducer';

const PatientsList: React.FC = () => {
  const dispatch =
    useDispatch<ThunkDispatch<PatientsState, unknown, AnyAction>>();

  const patientsData = useSelector((state: RootState) => state.patients);

  useEffect(() => {
    dispatch(fetchPatients());
  }, []);

  return (
    <div>
      <h2>Patients List</h2>
      <ul>
        {patientsData &&
          patientsData.patients?.map((patient: any) => (
            <li key={patient.id}>
              <img src={patient.avatar} alt={`${patient.name}'s Avatar`} />
              <strong>{patient.name}</strong>
              <p>Created At: {patient.createdAt}</p>
              <p>{patient.description}</p>
              <a
                href={patient.website}
                target='_blank'
                rel='noopener noreferrer'>
                Website
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PatientsList;
