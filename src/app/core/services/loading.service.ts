import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private loadingCount = 0;

  show() {
    this.loadingCount++;
    if (this.loadingCount === 1) {
      this.loadingSubject.next(true);
    }
  }

  hide() {
    this.loadingCount--;
    if (this.loadingCount === 0) {
      this.loadingSubject.next(false);
    }
    
    // Prevenir valores negativos
    if (this.loadingCount < 0) {
      this.loadingCount = 0;
    }
  }

  reset() {
    this.loadingCount = 0;
    this.loadingSubject.next(false);
  }
}