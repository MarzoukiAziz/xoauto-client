import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { CognitoUser } from './auth.types'; // Import the User model
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken: string | null = null;
  private apiUrl = environment.apiserver;

  private clientId = environment.cognitoAppClientId;
  private redirectUri = environment.cognitoRedirectUrl;

  private cognitoTokenUrl = environment.cognitoHostedUiUrl + '/oauth2/token';
  private cognitoUserInfoUrl =
    environment.cognitoHostedUiUrl + '/oauth2/userInfo';

  private cognitoLogoutUrl = environment.cognitoHostedUiUrl + '/logout'; // Cognito Logout URL

  constructor(private http: HttpClient, private router: Router) {}

  getAccessToken(): string | null {
    return this.accessToken || localStorage.getItem('access_token');
  }
  getUserInfo(): CognitoUser | null {
    return JSON.parse(localStorage.getItem('user_info') || '{}');
  }

  isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
  }

  exchangeCodeForToken(code: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('client_id', this.clientId)
      .set('code', code)
      .set('redirect_uri', this.redirectUri);

    return this.http
      .post(this.cognitoTokenUrl, body, { headers })
      .subscribe((response: any) => {
        this.storeTokens(response);
        this.fetchUserInfo(response.access_token);
      });
  }

  fetchUserInfo(token) {
    if (!token) {
      console.error('No access token found');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    this.http.get<CognitoUser>(this.cognitoUserInfoUrl, { headers }).subscribe(
      (userInfo: CognitoUser) => {
        this.getUserIdFromCid(userInfo.sub).subscribe((id) => {
          userInfo.id = id;
          this.saveUserInfo(userInfo);
          this.router.navigateByUrl('/user/dashboard');
        });
      },
      (error) => {
        console.error('Error fetching user info:', error);
      }
    );
  }

  storeTokens(response): void {
    this.accessToken = response.access_token;
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
  }

  saveUserInfo(userInfo: CognitoUser) {
    localStorage.setItem('user_info', JSON.stringify(userInfo));
  }

  // Sign out method
  signOut() {
    // Clear tokens and user info from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_info');
    this.accessToken = null;

    // Redirect to Cognito logout URL and pass redirect URI
    const logoutUrl = `${this.cognitoLogoutUrl}?client_id=${this.clientId}&logout_uri=${environment.cognitoLogoutUrl}`;
    window.location.href = logoutUrl;
  }

  getUserIdFromCid(cid: string): Observable<string> {
    return this.http.get<any>(this.apiUrl + '/user/cid/' + cid).pipe(
      map((response) => {
        return response.id;
      })
    );
  }
}
