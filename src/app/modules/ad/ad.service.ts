import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Ad } from './ad.types';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AdService {
  // API URL
  private apiUrl = environment.apiserver;

  // Private Subjects to hold the state
  private _ads: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private _ad: BehaviorSubject<any> = new BehaviorSubject(null);
  private _count: BehaviorSubject<number> = new BehaviorSubject(0);
  comparator = '';

  // Public flag for loading
  public loading = false;

  // Constructor with HttpClient
  constructor(
    private _httpClient: HttpClient,
    private cookieService: CookieService
  ) {
    this.comparator = this.cookieService.get('comparator-used');
  }

  // Accessors
  // Getter for ads
  get ads$(): Observable<any[]> {
    return this._ads.asObservable();
  }

  // Getter for a single ad
  get ad$(): Observable<any> {
    return this._ad.asObservable();
  }

  // Getter for total count
  get count$(): Observable<number> {
    return this._count.asObservable();
  }

  // @ Public methods

  getAdById(id: string): Observable<Ad[]> {
    return this._httpClient.get<Ad>(`${this.apiUrl}/ads/${id}`).pipe(
      tap((response: any) => {
        this._ad.next(response);
      })
    );
  }

  getTodayAds(page: number = 1): Observable<Ad[]> {
    const cookieValue = this.cookieService.get('comparator-used');
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
    // Check if this.comparator is empty
    if (!this.comparator) {
      // Return an empty observable or handle it as needed
      this._ads.next([]);
      this._count.next(0);
      this.loading = false;
      return of([]); // of() creates an observable of an empty array
    }

    return this._httpClient
      .get<Ad[]>(`${this.apiUrl}/ads/selected`, {
        params: {
          adsId: this.comparator,
        },
      })
      .pipe(
        tap((response: any) => {
          console.log(response);
          this._ads.next(response);
          this._count.next(response.length);
          this.loading = false;
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
}
