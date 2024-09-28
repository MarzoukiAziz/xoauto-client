import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { CognitoUser } from './auth.types'; // Import the User model

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken: string | null = null;

  private clientId = environment.cognitoAppClientId;
  private redirectUri = environment.cognitoRedirectUrl;

  private cognitoTokenUrl = environment.cognitoHostedUiUrl + '/oauth2/token';
  private cognitoUserInfoUrl =
    environment.cognitoHostedUiUrl + '/oauth2/userInfo';

  constructor(private http: HttpClient, private router: Router) {}

  getAccessToken(): string | null {
    return this.accessToken || localStorage.getItem('access_token');
  }
  getUserInfo(): string | null {
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
        console.log(response);
        this.storeTokens(response);
        this.fetchUserInfo();
        this.router.navigateByUrl('/dashboard');
      });
  }

  fetchUserInfo() {
    const token = this.getAccessToken();
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
        console.log('User Info:', userInfo);
        this.saveUserInfo(userInfo);
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
}
