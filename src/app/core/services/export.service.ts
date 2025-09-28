import { Injectable } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class ExportService {

  exportToCSV(patients: Patient[], filename: string = 'patients.csv'): void {
    const csvData = this.convertToCSV(patients);
    this.downloadFile(csvData, filename, 'text/csv');
  }

  exportToExcel(patients: Patient[], filename: string = 'patients.xlsx'): void {
    const workbook = XLSX.utils.book_new();
    
    const excelData = patients.map(patient => ({
      'ID': patient.patientId,
      'Document Type': patient.documentType,
      'Document Number': patient.documentNumber,
      'First Name': patient.firstName,
      'Last Name': patient.lastName,
      'Birth Date': this.formatDate(patient.birthDate),
      'Phone': patient.phoneNumber || '',
      'Email': patient.email || '',
      'Created At': this.formatDate(patient.createdAt)
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Patients');
    
    XLSX.writeFile(workbook, filename);
  }

  private convertToCSV(patients: Patient[]): string {
    const headers = ['ID', 'Document Type', 'Document Number', 'First Name', 'Last Name', 'Birth Date', 'Phone', 'Email', 'Created At'];
    const rows = patients.map(patient => [
      patient.patientId,
      patient.documentType,
      patient.documentNumber,
      patient.firstName,
      patient.lastName,
      this.formatDate(patient.birthDate),
      patient.phoneNumber || '',
      patient.email || '',
      this.formatDate(patient.createdAt)
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(field => `"${field}"`).join(','))
    ].join('\n');

    return csvContent;
  }

  private formatDate(date: Date | string): string {
    if (!date) return '';
    
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      // Check if the date is valid
      if (isNaN(dateObj.getTime())) {
        return '';
      }
      
      return dateObj.toLocaleDateString('es-ES'); // Format: DD/MM/YYYY
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
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