import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from '../components/patient-list/patient-list.component';

const routes: Routes = [
  { path: '', component: PatientListComponent },
  // { path: 'new', component: PatientFormComponent },
  // { path: 'edit/:id', component: PatientFormComponent },
  // { path: ':id', component: PatientDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }