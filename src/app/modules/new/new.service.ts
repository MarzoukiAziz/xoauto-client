import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { NewAdComment, Brand, Model, Version, NewSettings } from './new.types';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NewService {
  private newAdApiUrl = environment.newAdServiceApi;
  private adApiUrl = environment.adServiceApi;

  private _settings: BehaviorSubject<NewSettings> = new BehaviorSubject(null);
  private _versions: BehaviorSubject<Version[]> = new BehaviorSubject([]);
  private _model: BehaviorSubject<Model> = new BehaviorSubject(null);
  private _brand: BehaviorSubject<Brand> = new BehaviorSubject(null);
  private _newAdComments: BehaviorSubject<NewAdComment[]> = new BehaviorSubject(
    []
  );
  private _similarAds: BehaviorSubject<Model[]> = new BehaviorSubject([]);

  private _models: BehaviorSubject<Model[]> = new BehaviorSubject([]);
  private _count: BehaviorSubject<number> = new BehaviorSubject(0);

  currentPage = 1;
  loading = false;

  selectedBrands = [];
  selectedCategories = [];
  selectedEnergies = [];
  selectedSeats = [];
  priceMin = 0;
  priceMax = 1000000;
  autonomyMin = 0;
  autonomyMax = 1200;

  sort = {
    name: 'Prix Ascendant',
    code: 'price-asc',
  };

  constructor(private _httpClient: HttpClient, private toastr: ToastrService) {}

  get comparator(): string {
    return localStorage.getItem('comparator-new') || '';
  }

  get settings$(): Observable<NewSettings> {
    return this._settings.asObservable();
  }

  get models$(): Observable<Model[]> {
    return this._models.asObservable();
  }

  get versions$(): Observable<Version[]> {
    return this._versions.asObservable();
  }

  get model$(): Observable<Model> {
    return this._model.asObservable();
  }

  get brand$(): Observable<Brand> {
    return this._brand.asObservable();
  }

  get newAdComments$(): Observable<NewAdComment[]> {
    return this._newAdComments.asObservable();
  }

  get similarAds$(): Observable<Model[]> {
    return this._similarAds.asObservable();
  }

  get count$(): Observable<number> {
    return this._count.asObservable();
  }

  getSettings(): Observable<NewSettings> {
    return this._httpClient
      .get<NewSettings>(`${this.newAdApiUrl}/settings/new-details`)
      .pipe(
        tap((response: NewSettings) => {
          this._settings.next(response);
        })
      );
  }

  getModels(): Observable<Model[]> {
    this.loading = true;
    return this._httpClient
      .get<Model[]>(`${this.newAdApiUrl}/new-ads/search`, {
        params: {
          page: this.currentPage,
          brand: this.selectedBrands.map((brand) => brand.name),
          category: this.selectedCategories.map((category) => category.name_fr),
          fuel_type: this.selectedEnergies.map((energy) => energy.name_fr),
          seats: this.selectedSeats,
          priceMin: this.priceMin,
          priceMax: this.priceMax,
          autonomyMin: this.autonomyMin,
          autonomyMax: this.autonomyMax,
          sort: this.sort.code,
        },
      })
      .pipe(
        tap((response: any) => {
          this._models.next(response.models);
          this._count.next(response.count);
          this.loading = false;
        })
      );
  }

  getModelsByBrand(brand: string): Observable<Model[]> {
    return this._httpClient
      .get<Model[]>(`${this.newAdApiUrl}/new-ads/brand`, {
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
      .get<Model>(`${this.newAdApiUrl}/new-ads/brand`, {
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
      .get<Brand>(`${this.adApiUrl}/settings/brands/${brand}`)
      .pipe(
        tap((response: Brand) => {
          this._brand.next(response);
        })
      );
  }

  // Get Comments
  getNewAdComments(versions: string[]): Observable<NewAdComment[]> {
    return this._httpClient
      .get<NewAdComment[]>(this.newAdApiUrl + '/new-ad-comments/model/', {
        params: {
          versions,
        },
      })
      .pipe(
        tap((response: NewAdComment[]) => {
          this._newAdComments.next(response);
        })
      );
  }

  // Create Comment
  createComment(NewAdComment, versions: string[]): Observable<any> {
    return this._httpClient
      .post(this.newAdApiUrl + '/new-ad-comments', NewAdComment, {
        params: {
          versions,
        },
      })
      .pipe(
        tap((response: NewAdComment[]) => {
          this._newAdComments.next(response);
        })
      );
  }

  getSimilars(category, model, price): Observable<Model[]> {
    return this._httpClient
      .get<Model[]>(`${this.newAdApiUrl}/new-ads/similars`, {
        params: {
          category,
          model,
          price,
        },
      })
      .pipe(
        tap((response: any) => {
          this._similarAds.next(response.ads);
        })
      );
  }

  getVersionsForComparator(): Observable<Version[]> {
    if (!this.comparator) {
      this._versions.next([]);
      return of([]);
    }
    return this._httpClient
      .get<Version[]>(`${this.newAdApiUrl}/new-ads/selected`, {
        params: {
          versionsIds: this.comparator,
        },
      })
      .pipe(
        tap((response: any) => {
          this._versions.next(response);
        })
      );
  }

  addToCompare(id: string) {
    let comparatorArray = this.comparator ? this.comparator.split(',') : [];

    if (!comparatorArray.includes(id)) {
      comparatorArray.push(id);
      localStorage.setItem('comparator-new', comparatorArray.join(','));
      this.toastr.info('La voiture a été ajoutée à la comparaison !', '', {
        progressBar: true,
      });
    }
  }

  removeFromCompare(id: string) {
    let comparatorArray = this.comparator ? this.comparator.split(',') : [];

    // Filter out the id
    comparatorArray = comparatorArray.filter((item) => item !== id);
    localStorage.setItem('comparator-new', comparatorArray.join(','));

    // Update _versions subject after filtering
    const filteredVersions = this._versions
      .getValue()
      .filter((version) => version._id !== id);
    this._versions.next(filteredVersions);

    this.toastr.info('La voiture a été retirée de la comparaison !', '', {
      progressBar: true,
    });
  }

  resetFilters() {
    this.selectedBrands = [];
    this.selectedCategories = [];
    this.selectedEnergies = [];
    this.selectedSeats = [];
    this.priceMin = 0;
    this.priceMax = 1000000;
    this.autonomyMin = 0;
    this.autonomyMax = 1200;
  }
}
