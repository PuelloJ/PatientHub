import { Injectable } from '@angular/core';
import { Patient } from 'src/app/models/pateint.model';


@Injectable({
  providedIn: 'root'
})
export class ExportService {

  exportToCSV(patients: Patient[], filename: string = 'patients.csv'): void {
    const csvData = this.convertToCSV(patients);
    this.downloadFile(csvData, filename, 'text/csv');
  }

  exportToExcel(patients: Patient[], filename: string = 'patients.xlsx'): void {
    // For simplicity, we'll export as CSV for Excel compatibility
    // In a real scenario, you might use a library like xlsx
    const excelData = this.convertToCSV(patients);
    this.downloadFile(excelData, filename, 'application/vnd.ms-excel');
  }

  private convertToCSV(patients: Patient[]): string {
    const headers = ['ID', 'Document Type', 'Document Number', 'First Name', 'Last Name', 'Birth Date', 'Phone', 'Email', 'Created At'];
    const rows = patients.map(patient => [
      patient.patientId,
      patient.documentType,
      patient.documentNumber,
      patient.firstName,
      patient.lastName,
      patient.birthDate.toISOString().split('T')[0],
      patient.phoneNumber || '',
      patient.email || '',
      patient.createdAt.toISOString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(field => `"${field}"`).join(','))
    ].join('\n');

    return csvContent;
  }

  private downloadFile(data: string, filename: string, type: string): void {
    const blob = new Blob([data], { type });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}