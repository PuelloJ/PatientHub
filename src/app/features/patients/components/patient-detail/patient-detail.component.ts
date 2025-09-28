import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Patient } from '../../../../models/patient.model';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent {
  @Input() patient!: Patient;
  @Output() closed = new EventEmitter<void>();

  constructor() {}

  onClose(): void {
    this.closed.emit();
  }

  get displayName(): string {
    return this.patient ? `${this.patient.firstName} ${this.patient.lastName}` : '';
  }

  get documentText(): string {
    return this.patient ? `${this.patient.documentType} - ${this.patient.documentNumber}` : '';
  }

  get age(): number | null {
    if (this.patient && this.patient.birthDate) {
      const birthDate = new Date(this.patient.birthDate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      return age;
    }
    return null;
  }
}