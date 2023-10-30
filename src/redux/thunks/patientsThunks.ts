import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import {
  fetchPatientsStart,
  fetchPatientsSuccess,
  fetchPatientsFailure,
  addPatientStart,
  addPatientSuccess,
  addPatientFailure,
  editPatientStart,
  editPatientSuccess,
  editPatientFailure,
  Patient,
  ApiError,
  EditablePatientFields,
} from '../slices/patientsSlice';

// fix later

export const fetchPatients = createAsyncThunk<Patient[], void>(
  'patients/fetchPatients',
  async (_, { dispatch }) => {
    try {
      dispatch(fetchPatientsStart());
      const response = await fetch(
        'https://63bedcf7f5cfc0949b634fc8.mockapi.io/users'
      );
      const data = await response.json();
      dispatch(fetchPatientsSuccess(data));
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        const err: ApiError = {
          message: error.message,
        };
        dispatch(fetchPatientsFailure(err));
        throw error;
      } else {
        console.error('An unknown error occurred:', error);
      }
    }
  }
);

export const addPatient =
  (newPatient: Patient): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(addPatientStart());
      dispatch(addPatientSuccess(newPatient));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(addPatientFailure(error.toString()));
      } else {
        console.error('An unknown error occurred:', error);
      }
    }
  };

export const editPatient =
  (updatedPatient: EditablePatientFields): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(editPatientStart());
      dispatch(editPatientSuccess(updatedPatient));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(editPatientFailure(error.toString()));
      } else {
        console.error('An unknown error occurred:', error);
      }
    }
  };
