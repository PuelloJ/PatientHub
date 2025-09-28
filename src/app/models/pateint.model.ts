export interface Patient {
  patientId: number;
  documentType: string;
  documentNumber: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  phoneNumber?: string;
  email?: string;
  createdAt: Date;
}

export interface CreatePatient {
  documentType: string;
  documentNumber: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  phoneNumber?: string;
  email?: string;
}

export interface UpdatePatient {
  patientId: number;
  documentType: string;
  documentNumber: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  phoneNumber?: string;
  email?: string;
}

export interface PatientQueryParameters {
  page: number;
  pageSize: number;
  name?: string;
  documentNumber?: string;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  details?: string[];
}