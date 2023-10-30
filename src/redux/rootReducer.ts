import { combineReducers } from '@reduxjs/toolkit';
import patientsReducer from './slices/patientsSlice';

const rootReducer = combineReducers({
  patients: patientsReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
