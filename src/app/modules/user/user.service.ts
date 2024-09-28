import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from './user.types';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // API URL
  private apiUrl = environment.apiserver;

  // Private
  private _user: BehaviorSubject<User> = new BehaviorSubject(null);

  //Constructor
  constructor(private _httpClient: HttpClient, private auth: AuthService) {}

  // @ Accessors
  // Getter for user
  get user$(): Observable<User> {
    return this._user.asObservable();
  }

  // Get User
  getCurrentUser(): Observable<User> {
    const id = this.auth.getUserInfo()?.id;
    return this._httpClient.get<User>(this.apiUrl + '/user/' + id).pipe(
      map((user) => {
        this._user.next(user);
        return user;
      }),
      switchMap((user) => {
        if (!user) {
          return throwError('Could not found user with id of ' + id + '!');
        }
        return of(user);
      })
    );
  }

  // sign out
  signOut() {
    this.auth.signOut();
  }
}
