import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  CreatePatient,
  PagedResult,
  Patient,
  PatientQueryParameters,
} from 'src/app/models/pateint.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = 'http://localhost:5059/api/Patient';

  constructor(private http: HttpClient) {}

  createPatient(patient: CreatePatient): Observable<ApiResponse<Patient>> {
    return this.http.post<ApiResponse<Patient>>(this.apiUrl, patient);
  }

  getPatients(
    params: PatientQueryParameters
  ): Observable<ApiResponse<PagedResult<Patient>>> {
    let httpParams = new HttpParams()
      .set('page', params.page.toString())
      .set('pageSize', params.pageSize.toString());

    if (params.name) {
      httpParams = httpParams.set('name', params.name);
    }

    if (params.documentNumber) {
      httpParams = httpParams.set('documentNumber', params.documentNumber);
    }

    return this.http.get<ApiResponse<PagedResult<Patient>>>(this.apiUrl, {
      params: httpParams,
    });
  }

  getPatientById(patientId: number): Observable<ApiResponse<Patient>> {
    return this.http.get<ApiResponse<Patient>>(`${this.apiUrl}/${patientId}`);
  }

  updatePatient(patient: Patient): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(
      `${this.apiUrl}/${patient.patientId}`,
      patient
    );
  }

  deletePatient(patientId: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${patientId}`);
  }

  getPatientsCreatedAfter(date: Date): Observable<ApiResponse<Patient[]>> {
    return this.http.get<ApiResponse<Patient[]>>(
      `${this.apiUrl}/created-after`,
      {
        params: { date: date.toISOString() },
      }
    );
  }
}
