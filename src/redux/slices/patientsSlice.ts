import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Patient {
  avatar: string;
  createdAt: string;
  description: string;
  id: string;
  name: string;
  website: string;
}

export type EditablePatientFields = Pick<
  Patient,
  'name' | 'avatar' | 'description' | 'website'
>;

export interface ApiError {
  message: string;
}

export interface PatientsState {
  patients: Patient[];
  loading: boolean;
  error: ApiError | null;
}

const initialState: PatientsState = {
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
    fetchPatientsSuccess: (state, action: PayloadAction<Patient[]>) => {
      state.loading = false;
      state.patients = action.payload;
    },
    fetchPatientsFailure: (state, action: PayloadAction<ApiError>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addPatient: (state, action: PayloadAction<Patient>) => {
      state.patients.push(action.payload);
    },
    editPatient: (state, action: PayloadAction<Patient>) => {
      const index = state.patients.findIndex(
        (patient) => patient.id === action.payload.id
      );
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
    },
  },
});

export const {
  fetchPatientsStart,
  fetchPatientsSuccess,
  fetchPatientsFailure,
  addPatient,
  editPatient,
} = patientsSlice.actions;

export default patientsSlice.reducer;
