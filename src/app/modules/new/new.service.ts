import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Brand, Model, NewSettings } from './new.types';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewService {
  private apiUrl = environment.apiserver;

  private _settings: BehaviorSubject<NewSettings> = new BehaviorSubject(null);
  private _models: BehaviorSubject<Model[]> = new BehaviorSubject([]);
  private _model: BehaviorSubject<Model> = new BehaviorSubject(null);
  private _brand: BehaviorSubject<Brand> = new BehaviorSubject(null);

  comparator = '';
  sort = {
    name: 'Prix Ascendant',
    code: 'price-asc',
  };

  constructor(
    private _httpClient: HttpClient,
    private cookieService: CookieService
  ) {
    this.comparator = this.cookieService.get('comparator-new');
  }

  get settings$(): Observable<NewSettings> {
    return this._settings.asObservable();
  }

  get models$(): Observable<Model[]> {
    return this._models.asObservable();
  }

  get model$(): Observable<Model> {
    return this._model.asObservable();
  }

  get brand$(): Observable<Brand> {
    return this._brand.asObservable();
  }

  getSettings(): Observable<NewSettings> {
    return this._httpClient
      .get<NewSettings>(`${this.apiUrl}/settings/new-details`)
      .pipe(
        tap((response: NewSettings) => {
          this._settings.next(response);
        })
      );
  }

  getModels(brand: string): Observable<Model[]> {
    return this._httpClient
      .get<Model[]>(`${this.apiUrl}/new-ads/brand`, {
        params: {
          brand,
          sort: this.sort.code,
        },
      })
      .pipe(
        tap((response: any) => {
          this._models.next(response.ads);
        })
      );
  }

  getModel(brand: string, model: string): Observable<Model> {
    return this._httpClient
      .get<Model>(`${this.apiUrl}/new-ads/model`, {
        params: {
          brand,
          model,
        },
      })
      .pipe(
        tap((response: any) => {
          this._model.next(response.ads);
        })
      );
  }

  getBrand(brand: string): Observable<Brand> {
    return this._httpClient
      .get<Brand>(`${this.apiUrl}/settings/brands/${brand}`)
      .pipe(
        tap((response: Brand) => {
          this._brand.next(response);
        })
      );
  }
}
