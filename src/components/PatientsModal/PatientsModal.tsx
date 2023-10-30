import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { patientSchema } from './patientValidationSchema';
import {
  Modal,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { PATIENTS_CONSTANTS } from '../../constants/patientsConstants';
import { EditablePatientFields, PatientModalProps } from 'types';
import { FormWrapper } from './styles';

const defaultPatientValues = {
  name: '',
  avatar: '',
  description: '',
  website: '',
};

const PatientsModal: React.FC<PatientModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  onSubmit,
  mode,
  patient,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditablePatientFields>({
    defaultValues: patient || defaultPatientValues,
    resolver: yupResolver(patientSchema) as any,
  });

  const title =
    mode === 'add' ? PATIENTS_CONSTANTS.ADD : PATIENTS_CONSTANTS.EDIT_PATIENT;
  const saveButtonText =
    mode === 'add' ? PATIENTS_CONSTANTS.ADD : PATIENTS_CONSTANTS.SAVE;

  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <FormWrapper>
        <Typography variant='h5'>{title}</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={PATIENTS_CONSTANTS.NAME}
                fullWidth
                margin='normal'
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name='avatar'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={PATIENTS_CONSTANTS.AVATAR_URL}
                fullWidth
                margin='normal'
                error={!!errors.avatar}
                helperText={errors.avatar?.message}
              />
            )}
          />
          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={PATIENTS_CONSTANTS.DESCRIPTION}
                fullWidth
                margin='normal'
              />
            )}
          />
          <Controller
            name='website'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={PATIENTS_CONSTANTS.WEBSITE}
                fullWidth
                margin='normal'
                error={!!errors.website}
                helperText={errors.website?.message}
              />
            )}
          />
          <Button type='submit' variant='contained' color='primary'>
            {saveButtonText}
          </Button>
        </form>
      </FormWrapper>
    </Modal>
  );
};

export default PatientsModal;
