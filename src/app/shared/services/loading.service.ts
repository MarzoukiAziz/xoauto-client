import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading = new BehaviorSubject<boolean>(false);

  constructor() {}

  setLoading(loading: boolean) {
    this.loading.next(loading);
  }
}
