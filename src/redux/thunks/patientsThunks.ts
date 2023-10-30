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
} from '../slices/patientsSlice';

import { PatientType, ApiErrorType, EditablePatientFields } from 'types';

export const fetchPatients = createAsyncThunk<PatientType[], void>(
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
        const err: ApiErrorType = {
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
  (newPatient: PatientType): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(addPatientStart());
      setTimeout(() => {
        dispatch(addPatientSuccess(newPatient));
      }, 3000); //setTimeout to simulate a real request and show the loader
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
      setTimeout(() => {
        dispatch(editPatientSuccess(updatedPatient));
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(editPatientFailure(error.toString()));
      } else {
        console.error('An unknown error occurred:', error);
      }
    }
  };
