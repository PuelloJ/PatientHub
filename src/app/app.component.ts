import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'PatientHub';
  loading$ = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) {}
}
