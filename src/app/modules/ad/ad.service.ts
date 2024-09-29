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

  // Public flag for loading
  public loading = false;

  // Constructor with HttpClient
  constructor(private _httpClient: HttpClient) {}

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
  // Get today's ads
  getTodayAds(page: number = 1): Observable<Ad[]> {
    return this._httpClient
      .get<Ad[]>(`${this.apiUrl}/ads`, {
        params: {
          page,
          // period: '30',
        },
      })
      .pipe(
        tap((response: any) => {
          console.log(response);
          this._ads.next(response.ads);
          this._count.next(response.count);
          this.loading = false;
        })
      );
  }
}
