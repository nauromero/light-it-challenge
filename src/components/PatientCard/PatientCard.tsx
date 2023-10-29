import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Link,
  Collapse,
  Modal,
  TextField,
} from '@mui/material';
import { Patient, EditablePatientFields } from 'redux/slices/patientsSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { patientSchema } from './patientSchema';
import { TEXT_CONSTANTS } from './patientCardTexts';
import { formatDate } from 'helpers/helpers';

interface PatientCardProps {
  patient: Patient;
  onSave: (updatedPatient: EditablePatientFields) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, onSave }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditablePatientFields>({
    defaultValues: patient,
    resolver: yupResolver(patientSchema) as any,
  });

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const onSubmit = (data: EditablePatientFields) => {
    onSave(data);
    setIsModalOpen(false);
  };

  return (
    <Card
      variant='outlined'
      sx={{ margin: '8px', display: 'flex', flexDirection: 'row' }}>
      <CardContent sx={{ flex: '1' }}>
        <Typography variant='h6'>{patient.name}</Typography>

        <Button onClick={toggleCollapse}>
          {isCollapsed
            ? TEXT_CONSTANTS.SHOW_DETAILS
            : TEXT_CONSTANTS.HIDE_DETAILS}
        </Button>

        <Button
          onClick={() => {
            reset(patient);
            setIsModalOpen(true);
          }}>
          {TEXT_CONSTANTS.EDIT}
        </Button>

        <Collapse in={!isCollapsed}>
          <Typography variant='subtitle2'>
            {TEXT_CONSTANTS.CREATED_AT} {formatDate(patient.createdAt)}
          </Typography>
          <Typography variant='body2'>{patient.description}</Typography>
          <Link
            href={patient.website}
            target='_blank'
            rel='noopener noreferrer'>
            <Typography variant='body2'>{TEXT_CONSTANTS.WEBSITE}</Typography>
          </Link>
        </Collapse>

        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div
            style={{
              padding: '20px',
              background: 'white',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}>
            <Typography variant='h5'>{TEXT_CONSTANTS.EDIT_PATIENT}</Typography>
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
                {TEXT_CONSTANTS.SAVE}
              </Button>
            </form>
          </div>
        </Modal>
      </CardContent>
      <CardMedia
        component='img'
        image={patient.avatar}
        alt={`${patient.name}'s Avatar`}
        sx={{ width: '100px', height: '100px', objectFit: 'cover' }}
      />
    </Card>
  );
};

export default PatientCard;
