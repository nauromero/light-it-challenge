export interface PatientType {
  avatar: string;
  createdAt: string;
  description: string;
  id: string;
  name: string;
  website: string;
}

export type EditablePatientFields = Pick<
  PatientType,
  'name' | 'avatar' | 'description' | 'website'
>;

export interface ApiErrorType {
  message: string;
}

export interface PatientsStateType {
  patients: PatientType[];
  loading: boolean;
  error: ApiErrorType | null;
}

export interface PatientModalProps {
  mode: string;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onSubmit: (data: EditablePatientFields | PatientType) => void;
  patient?: PatientType;
}
