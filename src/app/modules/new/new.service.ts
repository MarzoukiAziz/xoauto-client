import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { NewSettings } from './new.types';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewService {
  private apiUrl = environment.apiserver;

  private _settings: BehaviorSubject<NewSettings> = new BehaviorSubject(null);
  public loading = false;
  comparator = '';

  constructor(
    private _httpClient: HttpClient,
    private cookieService: CookieService
  ) {
    this.comparator = this.cookieService.get('comparator-new');
  }

  get settings$(): Observable<NewSettings> {
    return this._settings.asObservable();
  }

  getSettings(): Observable<NewSettings> {
    this.loading = true;
    return this._httpClient
      .get<NewSettings>(`${this.apiUrl}/settings/new-details`)
      .pipe(
        tap((response: NewSettings) => {
          this._settings.next(response);
          this.loading = false;
        })
      );
  }
}
