import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//fix later
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
