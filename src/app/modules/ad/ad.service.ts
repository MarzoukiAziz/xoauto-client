import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Ad, Settings } from './ad.types';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdService {
  private apiUrl = environment.apiserver;

  // State
  private _ads: BehaviorSubject<Ad[]> = new BehaviorSubject([]);
  private _similarAds: BehaviorSubject<Ad[]> = new BehaviorSubject([]);
  private _ad: BehaviorSubject<Ad> = new BehaviorSubject(null);
  private _count: BehaviorSubject<number> = new BehaviorSubject(0);
  private _settings: BehaviorSubject<Settings> = new BehaviorSubject(null);

  comparator = '';
  currentPage = 1;
  public loading = false;

  // filters:
  selectedBrands = [];
  selectedModels = [];
  selectedCategories = [];
  selectedEnergies = [];
  selectedSeats = [];
  selectedColors = [];
  selectedSellerTypes = [];
  selectedRegions = [];
  priceMin = 0;
  priceMax = 1000000;
  autonomyMin = 0;
  autonomyMax = 1200;
  mileageMin = 0;
  mileageMax = 500000;
  yearMin = 2000;
  yearMax = new Date().getFullYear();
  sort = {
    name: 'Plus récentes',
    code: 'desc',
  };

  constructor(
    private _httpClient: HttpClient,
    private cookieService: CookieService,
    private _auth: AuthService
  ) {
    this.comparator = this.cookieService.get('comparator-used');
  }

  // Accessors
  get ads$(): Observable<Ad[]> {
    return this._ads.asObservable();
  }

  get similarAds$(): Observable<Ad[]> {
    return this._similarAds.asObservable();
  }

  get ad$(): Observable<Ad> {
    return this._ad.asObservable();
  }

  get count$(): Observable<number> {
    return this._count.asObservable();
  }

  get settings$(): Observable<Settings> {
    return this._settings.asObservable();
  }

  // @ Public methods
  getSettings(): Observable<Settings> {
    return this._httpClient.get<Settings>(`${this.apiUrl}/settings`).pipe(
      tap((response: Settings) => {
        this._settings.next(response);
      })
    );
  }

  getAds(): Observable<Ad[]> {
    this.loading = true;
    return this._httpClient
      .get<Ad[]>(`${this.apiUrl}/ads`, {
        params: {
          page: this.currentPage,
          brand: this.selectedBrands.map((brand) => brand.name),
          model: this.selectedModels.map((model) => model.name),
          category: this.selectedCategories.map((category) => category.name_fr),
          fuel_type: this.selectedEnergies.map((energy) => energy.name_fr),
          seats: this.selectedSeats,
          color: this.selectedColors.map((color) => color.name_fr),
          sellerType: this.selectedSellerTypes,
          region: this.selectedRegions.map((region) => region.name_fr),
          priceMin: this.priceMin,
          priceMax: this.priceMax,
          autonomyMin: this.autonomyMin,
          autonomyMax: this.autonomyMax,
          mileageMin: this.mileageMin,
          mileageMax: this.mileageMax,
          yearMin: this.yearMin,
          yearMax: this.yearMax,
          sort: this.sort.code,
        },
      })
      .pipe(
        tap((response: any) => {
          this._ads.next(response.ads);
          this._count.next(response.count);
          this.loading = false;
        })
      );
  }

  getAdById(id: string): Observable<Ad> {
    return this._httpClient.get<Ad>(`${this.apiUrl}/ads/${id}`).pipe(
      tap((ad: Ad) => {
        this._ad.next(ad);
      })
    );
  }

  getTodayAds(page: number = 1): Observable<Ad[]> {
    return this._httpClient
      .get<Ad[]>(`${this.apiUrl}/ads`, {
        params: {
          page,
          period: '1',
        },
      })
      .pipe(
        tap((response: any) => {
          this._ads.next(response.ads);
          this._count.next(response.count);
          this.loading = false;
        })
      );
  }

  getAdsForComparator(): Observable<Ad[]> {
    if (!this.comparator) {
      this._ads.next([]);
      this._count.next(0);
      this.loading = false;
      return of([]);
    }

    return this._httpClient
      .get<Ad[]>(`${this.apiUrl}/ads/selected`, {
        params: {
          adsId: this.comparator,
        },
      })
      .pipe(
        tap((response: any) => {
          this._ads.next(response);
          this._count.next(response.length);
          this.loading = false;
        })
      );
  }

  getUserAds(page: number = 1): Observable<Ad[]> {
    const uid = this._auth.getUserInfo()?.id;
    return this._httpClient
      .get<Ad[]>(`${this.apiUrl}/ads`, {
        params: {
          page,
          uid,
        },
      })
      .pipe(
        tap((response: any) => {
          this._ads.next(response.ads);
          this._count.next(response.count);
        })
      );
  }

  getSimilars(category, adId, price): Observable<Ad[]> {
    return this._httpClient
      .get<Ad[]>(`${this.apiUrl}/ads/similars`, {
        params: {
          category,
          adId,
          price,
        },
      })
      .pipe(
        tap((response: any) => {
          this._similarAds.next(response);
        })
      );
  }

  addToCompare(id) {
    const cookieValue = this.cookieService.get('comparator-used');
    let arr = cookieValue.split(',');
    let value = '';
    if (arr.indexOf(id) == -1) {
      if (cookieValue == '') {
        value = id;
      } else {
        value = cookieValue + ',' + id;
      }
      this.cookieService.set('comparator-used', value);
      this.comparator = value;
    }
  }

  removeFromCompare(id) {
    let cookieValue = this.cookieService.get('comparator-used');
    let arr = cookieValue.split(',');
    arr = arr.filter((item) => item !== id);
    const value = arr.join(',');
    this.cookieService.set('comparator-used', value);
    this.comparator = value;
  }

  resetFilters() {
    this.selectedBrands = [];
    this.selectedModels = [];
    this.selectedCategories = [];
    this.selectedEnergies = [];
    this.selectedSeats = [];
    this.selectedColors = [];
    this.selectedSellerTypes = [];
    this.selectedRegions = [];
    this.priceMin = 0;
    this.priceMax = 1000000;
    this.autonomyMin = 0;
    this.autonomyMax = 1200;
    this.mileageMin = 0;
    this.mileageMax = 500000;
    this.yearMin = 2000;
    this.yearMax = new Date().getFullYear();
  }
}
