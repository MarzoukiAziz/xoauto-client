import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  forkJoin,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Ad, Settings } from './ad.types';
import { AuthService } from '../auth/auth.service';
import { CloudinaryUploadService } from 'src/app/shared/services/cloudinary-upload.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AdService {
  private adApiUrl = environment.adServiceApi;
  private userApiUrl = environment.userServiceApi;

  // State
  private _ads: BehaviorSubject<Ad[]> = new BehaviorSubject([]);
  private _similarAds: BehaviorSubject<Ad[]> = new BehaviorSubject([]);
  private _ad: BehaviorSubject<Ad> = new BehaviorSubject(null);
  private _count: BehaviorSubject<number> = new BehaviorSubject(0);
  private _settings: BehaviorSubject<Settings> = new BehaviorSubject(null);
  private _savedAds: BehaviorSubject<string[]> = new BehaviorSubject([]);

  public loading = false;
  currentPage = 1;

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
    private _auth: AuthService,
    private cloud: CloudinaryUploadService,
    private toastr: ToastrService
  ) {}

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

  get comparator(): string {
    return localStorage.getItem('comparator-used') || '';
  }

  get savedAds$(): Observable<string[]> {
    return this._savedAds.asObservable();
  }

  // @ Public methods
  getSettings(): Observable<Settings> {
    return this._httpClient.get<Settings>(`${this.adApiUrl}/settings`).pipe(
      tap((response: Settings) => {
        this._settings.next(response);
      })
    );
  }

  getAds(): Observable<Ad[]> {
    this.loading = true;
    return this._httpClient
      .get<Ad[]>(`${this.adApiUrl}/ads/search`, {
        params: {
          page: this.currentPage,
          brand: this.selectedBrands.map((brand) => brand.name),
          car_model: this.selectedModels.map((model) => model.name),
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
    return this._httpClient
      .get<Ad>(`${this.adApiUrl}/ads/${id}`, {
        params: {
          view: true,
          includeViews: false,
        },
      })
      .pipe(
        tap((ad: Ad) => {
          this._ad.next(ad);
        })
      );
  }

  getTodayAds(page: number = 1): Observable<Ad[]> {
    return this._httpClient
      .get<Ad[]>(`${this.adApiUrl}/ads/search`, {
        params: {
          page,
          period: '1',
        },
      })
      .pipe(
        tap((response: any) => {
          this._ads.next(response.ads);
          this._count.next(response.count);
        })
      );
  }

  getAdsForComparator(): Observable<Ad[]> {
    if (!this.comparator) {
      this._ads.next([]);
      this._count.next(0);
      return of([]);
    }

    return this._httpClient
      .get<Ad[]>(`${this.adApiUrl}/ads/selected`, {
        params: {
          adsId: this.comparator,
        },
      })
      .pipe(
        tap((response: any) => {
          this._ads.next(response);
          this._count.next(response.length);
        })
      );
  }

  getUserAds(page: number = 1): Observable<Ad[]> {
    const uid = this._auth.getUserInfo()?.id;
    return this._httpClient
      .get<Ad[]>(`${this.adApiUrl}/ads/search`, {
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
      .get<Ad[]>(`${this.adApiUrl}/ads/similars`, {
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
    let comparatorArray = this.comparator ? this.comparator.split(',') : [];

    if (!comparatorArray.includes(id)) {
      comparatorArray.push(id);
      localStorage.setItem('comparator-used', comparatorArray.join(','));
      this.toastr.info("L'annonce a été ajoutée à la comparaison !", '', {
        progressBar: true,
      });
    }
  }

  removeFromCompare(id: string, removeFromAds = false) {
    let comparatorArray = this.comparator ? this.comparator.split(',') : [];

    // Filter out the id
    comparatorArray = comparatorArray.filter((item) => item !== id);
    localStorage.setItem('comparator-used', comparatorArray.join(','));

    // Update _versions subject after filtering
    if (removeFromAds) {
      const filteredVersions = this._ads
        .getValue()
        .filter((version) => version._id !== id);
      this._ads.next(filteredVersions);
    }

    this.toastr.info("L'annonce a été retirée de la comparaison !", '', {
      progressBar: true,
    });
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

  getSavedAdsData(page: number = 1): Observable<Ad[]> {
    const saved = this._auth.getUserInfo()?.id;
    return this._httpClient
      .get<Ad[]>(`${this.adApiUrl}/ads/search`, {
        params: {
          page,
          saved,
        },
      })
      .pipe(
        tap((response: any) => {
          this._ads.next(response.ads);
          this._count.next(response.count);
        })
      );
  }

  getSavedAds(): Observable<string[]> {
    const uid = this._auth.getUserInfo()?.id;

    return this._httpClient
      .get<string[]>(`${this.userApiUrl}/user/saved/${uid}`)
      .pipe(
        tap((response: any) => {
          this._savedAds.next(response);
        })
      );
  }

  updateSavedAds(uid: string, newSavedAds: string[]): Observable<string[]> {
    return this._httpClient
      .put<string[]>(`${this.userApiUrl}/user/saved/${uid}`, newSavedAds)
      .pipe(
        tap((response: any) => {
          this._savedAds.next(response);
        })
      );
  }

  /*******************
   **** Update AD ****
   ******************/

  changeAdStatus(id: string, status: boolean): Observable<Ad> {
    const user = this._auth.getUserInfo();
    const uid = user.id;
    return this._httpClient
      .put<Ad>(
        `${this.adApiUrl}/ads/change-status/${id}`,
        {},
        {
          params: { uid, status },
        }
      )
      .pipe(
        tap((updatedAd: Ad) => {
          const currentAds = this._ads.getValue();
          const updatedAds = currentAds.map((ad) =>
            ad._id === id ? updatedAd : ad
          );
          this._ads.next(updatedAds);
        })
      );
  }

  deleteAd(id: string): Observable<Ad> {
    const user = this._auth.getUserInfo();
    const uid = user.id;
    return this._httpClient
      .delete<Ad>(`${this.adApiUrl}/ads/user/${id}`, {
        params: { uid },
      })
      .pipe(
        tap((deleteAd: Ad) => {
          const currentAds = this._ads.getValue();
          const updatedAds = currentAds.filter((ad) => ad._id !== deleteAd._id);
          this._count.next(this._count.getValue() - 1);
          this._ads.next(updatedAds);
        })
      );
  }

  /*************************
   ******* New Ad  **********
   **************************/
  step = 1;
  photos = [];
  video1 = undefined;
  video2 = undefined;
  newAd: Ad = {
    uid: null,
    title: '',
    description: '',
    price: 0,
    type: 'used',
    brand: '',
    car_model: '',
    version: '',
    category: '',
    mileage: 0,
    first_registration: {
      year: 0,
      month: 0,
    },
    fuel_type: '',
    seats: undefined,
    color: '',
    crit_air: '',
    horsepower: undefined,
    power_kw: undefined,
    region: '',
    autonomy_wltp_km: undefined,
    equipments: {
      safety: [],
      outdoor: [],
      indoor: [],
      functional: [],
    },
    options_vehicule: {
      non_smoker: false,
      first_hand: false,
      manufacturer_warranty: false,
      others: [],
    },
    photos: [],
    interior_video: '',
    exterior_video: '',
    address: '',
    phone_number: '',
    mask_phone: false,
    active: true,
    sold: false,
    pro: false,
  };

  createAd() {
    const user = this._auth.getUserInfo();
    this.newAd.uid = user.id;
    this.newAd.phone_number = user.phone_number;
    if (this.photos) {
      const imageUploads = this.photos.map((file) =>
        this.cloud.getAdPicSignature().pipe(
          switchMap((res) => {
            return this.cloud.uploadAdPic(res.timestamp, res.signature, file);
          })
        )
      );

      // First upload all photos
      forkJoin(imageUploads).subscribe((imageResults) => {
        imageResults.forEach((res: any) => {
          this.newAd.photos.push(res['secure_url']);
        });

        const videoUploads: Observable<any>[] = [];

        // If video1 exists, queue its upload
        if (this.video1) {
          videoUploads.push(
            this.cloud.getVideoSignature().pipe(
              switchMap((res) =>
                this.cloud.uploadAdVideo(
                  res.timestamp,
                  res.signature,
                  this.video1
                )
              ),
              tap((res: any) => {
                this.newAd.interior_video = res['secure_url'];
              })
            )
          );
        }

        // If video2 exists, queue its upload
        if (this.video2) {
          videoUploads.push(
            this.cloud.getVideoSignature().pipe(
              switchMap((res) =>
                this.cloud.uploadAdVideo(
                  res.timestamp,
                  res.signature,
                  this.video2
                )
              ),
              tap((res: any) => {
                this.newAd.exterior_video = res['secure_url'];
              })
            )
          );
        }

        // Once videos (if any) are uploaded, post the ad
        forkJoin(videoUploads.length > 0 ? videoUploads : [of(null)]).subscribe(
          () => {
            this._httpClient
              .post<Ad>(`${this.adApiUrl}/ads`, this.newAd)
              .pipe(
                tap((ad: Ad) => {
                  this._ad.next(ad);
                  this.step = 8;
                })
              )
              .subscribe();
          }
        );
      });
    }
  }
}
