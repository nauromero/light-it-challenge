import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchPatientsStart,
  fetchPatientsSuccess,
  fetchPatientsFailure,
  Patient,
  ApiError,
} from '../slices/patientsSlice';

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
    } catch (error: any) {
      const err: ApiError = {
        message: error.message,
      };
      dispatch(fetchPatientsFailure(err));
      throw error;
    }
  }
);
