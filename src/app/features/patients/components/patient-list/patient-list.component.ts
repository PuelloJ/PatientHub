import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExportService } from 'src/app/core/services/export.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { Patient, PatientQueryParameters } from 'src/app/models/patient.model';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];
  loading: boolean = false;
  totalRecords: number = 0;
  pageSize: number = 10;
  first: number = 0;

  nameFilter: string = '';
  documentNumberFilter: string = '';

  displayExportModal: boolean = false;
  exportDate: Date = new Date();
  exportOption: string = 'all';

  // Modal properties
  displayPatientModal: boolean = false;
  displayDetailModal: boolean = false;
  selectedPatient: Patient | null = null;
  modalMode: 'create' | 'edit' | 'view' = 'create';

  constructor(
    private patientService: PatientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }
  loadPatients() {
    this.loading = true;
    const queryParams: PatientQueryParameters = {
      page: this.first / this.pageSize + 1,
      pageSize: this.pageSize,
      name: this.nameFilter || undefined,
      documentNumber: this.documentNumberFilter || undefined,
    };

    this.patientService.getPatients(queryParams).subscribe({
      next: (response) => {
        if (response && response.items) {
          this.patients = response.items;
          this.totalRecords = response.totalCount;
        } else {
          this.patients = [];
          this.totalRecords = 0;
        }

        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load patients.',
        });
      },
    });
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.pageSize = event.rows;
    this.loadPatients();
  }

  applyFilters(): void {
    this.first = 0;
    this.loadPatients();
  }

  clearFilters(): void {
    this.nameFilter = '';
    this.documentNumberFilter = '';
    this.first = 0;
    this.loadPatients();
  }

  confirmDelete(patient: Patient): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete patient ${patient.firstName} ${patient.lastName}?`,
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deletePatient(patient.patientId);
      },
    });
  }

  private deletePatient(id: number): void {
    this.patientService.deletePatient(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Patient deleted successfully',
        });
        this.loadPatients();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete patient',
        });
      },
    });
  }

  openExportModal(): void {
    this.displayExportModal = true;
    this.exportDate = new Date();
    this.exportOption = 'all';
  }

  exportToCSV(): void {
    if (this.exportOption === 'all') {
      // Export all patients without date filter
      const queryParams: PatientQueryParameters = {
        page: 1,
        pageSize: 10000, // Large number to get all patients
        name: this.nameFilter || undefined,
        documentNumber: this.documentNumberFilter || undefined,
      };

      this.patientService.getPatients(queryParams).subscribe({
        next: (response) => {
          if (response && response.items) {
            this.exportService.exportToCSV(
              response.items,
              `all_patients_${new Date().toISOString().split('T')[0]}.csv`
            );
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'All patients exported to CSV successfully',
            });
          }
          this.displayExportModal = false;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to export data',
          });
          this.displayExportModal = false;
        },
      });
    } else {
      // Export patients created after specific date
      this.patientService.getPatientsCreatedAfter(this.exportDate).subscribe({
        next: (response) => {
          if (response && response.length > 0) {
            this.exportService.exportToCSV(
              response,
              `patients_after_${this.exportDate.toISOString().split('T')[0]}.csv`
            );
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Filtered patients exported to CSV successfully',
            });
          } else {
            this.messageService.add({
              severity: 'info',
              summary: 'No Data',
              detail: 'No patients found for the selected date',
            });
          }
          this.displayExportModal = false;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to export data',
          });
          this.displayExportModal = false;
        },
      });
    }
  }

  exportToExcel(): void {
    if (this.exportOption === 'all') {
      // Export all patients without date filter
      const queryParams: PatientQueryParameters = {
        page: 1,
        pageSize: 10000, // Large number to get all patients
        name: this.nameFilter || undefined,
        documentNumber: this.documentNumberFilter || undefined,
      };

      this.patientService.getPatients(queryParams).subscribe({
        next: (response) => {
          if (response && response.items) {
            this.exportService.exportToExcel(
              response.items,
              `all_patients_${new Date().toISOString().split('T')[0]}.xlsx`
            );
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'All patients exported to Excel successfully',
            });
          }
          this.displayExportModal = false;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to export data',
          });
          this.displayExportModal = false;
        },
      });
    } else {
      // Export patients created after specific date
      this.patientService.getPatientsCreatedAfter(this.exportDate).subscribe({
        next: (response) => {
          if (response && response.length > 0) {
            this.exportService.exportToExcel(
              response,
              `patients_after_${this.exportDate.toISOString().split('T')[0]}.xlsx`
            );
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Filtered patients exported to Excel successfully',
            });
          } else {
            this.messageService.add({
              severity: 'info',
              summary: 'No Data',
              detail: 'No patients found for the selected date',
            });
          }
          this.displayExportModal = false;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to export data',
          });
          this.displayExportModal = false;
        },
      });
    }
  }

  // Modal methods
  openCreatePatientModal(): void {
    this.modalMode = 'create';
    this.selectedPatient = null;
    this.displayPatientModal = true;
  }

  openEditPatientModal(patient: Patient): void {
    this.modalMode = 'edit';
    this.selectedPatient = { ...patient };
    this.displayPatientModal = true;
  }

  openViewPatientModal(patient: Patient): void {
    this.modalMode = 'view';
    this.selectedPatient = { ...patient };
    this.displayDetailModal = true;
  }

  closePatientModal(): void {
    this.displayPatientModal = false;
    this.displayDetailModal = false;
    this.selectedPatient = null;
  }

  onPatientSaved(): void {
    this.closePatientModal();
    this.loadPatients(); // Refresh the list
  }
}
