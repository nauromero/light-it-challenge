import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {PatientType, ApiErrorType, PatientsStateType} from '../../types'

const initialState: PatientsStateType = {
  patients: [],
  loading: false,
  error: null,
};

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    fetchPatientsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPatientsSuccess: (state, action: PayloadAction<PatientType[]>) => {
      state.loading = false;
      state.patients = action.payload;
    },
    fetchPatientsFailure: (state, action: PayloadAction<ApiErrorType>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addPatientStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addPatientSuccess: (state, { payload }) => {
      state.loading = false;
      state.patients.push(payload);
    },
    addPatientFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    editPatientStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    editPatientSuccess: (state, { payload }) => {
      state.loading = false;
      const index = state.patients.findIndex(
        (patient) => patient.id === payload.id
      );
      if (index !== -1) {
        state.patients[index] = payload;
      }
    },
    editPatientFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  fetchPatientsStart,
  fetchPatientsSuccess,
  fetchPatientsFailure,
  addPatientStart,
  addPatientSuccess,
  addPatientFailure,
  editPatientStart,
  editPatientSuccess,
  editPatientFailure,
} = patientsSlice.actions;

export default patientsSlice.reducer;
