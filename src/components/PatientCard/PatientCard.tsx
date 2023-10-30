import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Link,
  Collapse,
} from '@mui/material';
import { Patient, EditablePatientFields } from 'redux/slices/patientsSlice';

import { TEXT_CONSTANTS } from '../patientCardTexts';
import { formatDate } from 'helpers/helpers';
import PatientsModal from '../PatientsModal/PatientsModal';

interface PatientCardProps {
  patient: Patient;
  onSave: (updatedPatient: EditablePatientFields) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, onSave }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

        <PatientsModal
          mode={TEXT_CONSTANTS.EDIT}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onSubmit={onSubmit}
          patient={patient}
        />
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
