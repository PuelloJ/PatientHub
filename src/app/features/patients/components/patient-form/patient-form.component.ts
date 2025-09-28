import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../../../core/services/patient.service';
import { MessageService } from 'primeng/api';
import { Patient } from 'src/app/models/patient.model';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css'],
})
export class PatientFormComponent implements OnInit {
  @Input() patient: Patient | null = null;
  @Input() mode: 'create' | 'edit' | 'view' = 'create';
  @Output() patientSaved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  patientForm: FormGroup;
  isEdit = false;
  loading = false;
  submitting = false;
  patientId?: number;

  documentTypes = [
    { label: 'Registro Civil de Nacimiento', value: 'RC' },
    { label: 'Tarjeta de Identidad', value: 'TI' },
    { label: 'Cédula de Ciudadanía', value: 'CC' },
    { label: 'Cédula de Extranjería', value: 'CE' },
    { label: 'Pasaporte', value: 'PA' },
  ];

  // Maximum date for birth date (today)
  maxDate = new Date();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private messageService: MessageService
  ) {
    this.patientForm = this.createForm();
  }

  ngOnInit(): void {
    this.isEdit = this.mode === 'edit';
    
    if (this.patient && this.mode === 'edit') {
      this.patientId = this.patient.patientId;
      this.populateForm();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      documentType: ['', Validators.required],
      documentNumber: ['', [Validators.required, Validators.maxLength(20)]],
      firstName: ['', [Validators.required, Validators.maxLength(80)]],
      lastName: ['', [Validators.required, Validators.maxLength(80)]],
      birthDate: ['', [Validators.required, this.pastDateValidator]],
      phoneNumber: [''],
      email: ['', Validators.email],
    });
  }

  loadPatient(): void {
    if (!this.patientId) return;

    this.loading = true;
    this.patientService.getPatientById(this.patientId).subscribe({
      next: (response) => {
        if (response.data) {
          this.patientForm.patchValue({
            ...response.data,
            birthDate: new Date(response.data.birthDate),
          });
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load patient data',
        });
      },
    });
  }

  populateForm(): void {
    if (this.patient) {
      this.patientForm.patchValue({
        documentType: this.patient.documentType,
        documentNumber: this.patient.documentNumber,
        firstName: this.patient.firstName,
        lastName: this.patient.lastName,
        birthDate: new Date(this.patient.birthDate),
        phoneNumber: this.patient.phoneNumber,
        email: this.patient.email,
      });
    }
  }

  getYearRange(): string {
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 120; // Allow ages up to 120 years
    return `${minYear}:${currentYear}`;
  }

  pastDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null; // Let required validator handle empty values
    }
    
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Set to end of today
    
    if (selectedDate > today) {
      return { futureDate: true };
    }
    
    return null;
  }

  onSubmit(): void {
    if (this.patientForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.submitting = true;
    const formValue = this.patientForm.value;

    if (this.isEdit && this.patientId) {
      const updateData = { ...formValue, patientId: this.patientId };
      this.patientService.updatePatient(updateData).subscribe({
        next: () => {
          this.handleSuccess('Patient updated successfully');
        },
        error: (error) => {
          this.handleError('Failed to update patient', error);
        },
      });
    } else {
      this.patientService.createPatient(formValue).subscribe({
        next: () => {
          this.handleSuccess('Patient created successfully');
        },
        error: (error) => {
          this.handleError('Failed to create patient', error);
        },
      });
    }
  }

  private handleSuccess(message: string): void {
    this.submitting = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
    this.patientSaved.emit();
  }

  private handleError(message: string, error: any): void {
    this.submitting = false;

    let errorDetail = message;
    if (error.error?.error) {
      errorDetail = error.error.error;
    } else if (error.error?.details) {
      errorDetail = error.error.details.join(', ');
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: errorDetail,
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.patientForm.controls).forEach((key) => {
      this.patientForm.get(key)?.markAsTouched();
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  get f() {
    return this.patientForm.controls;
  }
}
