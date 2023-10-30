import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { patientSchema } from './patientValidationSchema';
import { Modal, Typography, TextField, Button } from '@mui/material';
import { Controller } from 'react-hook-form';
import { TEXT_CONSTANTS } from '../patientCardTexts';
import { EditablePatientFields, Patient } from 'redux/slices/patientsSlice';
import { FormWrapper } from './styles'

interface PatientModalProps {
  mode: string;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onSubmit: (data: EditablePatientFields) => void;
  patient?: Patient;
}

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
    defaultValues: patient || {},
    resolver: yupResolver(patientSchema) as any,
  });

  const title =
    mode === 'add' ? TEXT_CONSTANTS.ADD : TEXT_CONSTANTS.EDIT_PATIENT;
  const saveButtonText =
    mode === 'add' ? TEXT_CONSTANTS.ADD : TEXT_CONSTANTS.SAVE;

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
                label={TEXT_CONSTANTS.NAME}
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
                label={TEXT_CONSTANTS.AVATAR_URL}
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
                label={TEXT_CONSTANTS.DESCRIPTION}
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
                label={TEXT_CONSTANTS.WEBSITE}
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
