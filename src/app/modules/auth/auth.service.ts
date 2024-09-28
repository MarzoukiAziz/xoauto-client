import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken: string | null = null;
  private clientId = environment.cognitoAppClientId;
  private redirectUri = environment.cognitoRedirectUrl;
  private cognitoTokenUrl = environment.cognitoHostedUiUrl + '/oauth2/token';

  constructor(private http: HttpClient) {}

  storeAccessToken(token: string): void {
    this.accessToken = token;
    localStorage.setItem('access_token', token); // Optional: Store in local storage
  }

  getAccessToken(): string | null {
    return this.accessToken || localStorage.getItem('access_token');
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
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
      });
  }
}
