import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// PrimeNG Modules
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { ToolbarModule } from 'primeng/toolbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TooltipModule } from 'primeng/tooltip';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientListComponent } from '../components/patient-list/patient-list.component';
import { PatientFormComponent } from '../components/patient-form/patient-form.component';
import { PatientDetailComponent } from '../components/patient-detail/patient-detail.component';

@NgModule({
  declarations: [
    PatientListComponent,
    PatientFormComponent,
    PatientDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    PatientsRoutingModule,
    
    // PrimeNG Modules
    CardModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    ProgressSpinnerModule,
    MessageModule,
    ToolbarModule,
    RadioButtonModule,
    TooltipModule
  ]
})
export class PatientsModule { }