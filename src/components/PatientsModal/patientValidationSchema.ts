import * as yup from 'yup';

export const patientSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  avatar: yup.string().url('Must be a valid URL').required('Avatar URL is required'),
  description: yup.string().optional(),
  website: yup.string().url('Must be a valid URL').optional(),
});