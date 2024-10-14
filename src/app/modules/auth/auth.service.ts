import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { CognitoUser } from './auth.types'; // Import the User model
import { map, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken: string | null = null;
  private userApiUrl = environment.userServiceApi;

  private clientId = environment.cognitoAppClientId;
  private redirectUri = environment.cognitoRedirectUrl;

  private cognitoTokenUrl = environment.cognitoHostedUiUrl + '/oauth2/token';
  private cognitoUserInfoUrl =
    environment.cognitoHostedUiUrl + '/oauth2/userInfo';

  private cognitoLogoutUrl = environment.cognitoHostedUiUrl + '/logout'; // Cognito Logout URL

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

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

  fetchUserInfo(token: string) {
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
        this.getUserIdFromCid(userInfo.sub).subscribe(
          (id) => {
            userInfo.id = id;
            this.saveUserInfo(userInfo);
            this.router.navigateByUrl('/user/dashboard');
            this.toastr.success(
              'Nous sommes ravis de vous accueillir de nouveau !',
              'Bienvenue',
              {
                progressBar: true,
              }
            );
          },
          (error) => {
            if (error && error.error.redirectTo) {
              this.router.navigate([error.error.redirectTo], {
                queryParams: {
                  email: error.error.data.email,
                  id: error.error.data.id,
                },
              });
            }
          }
        );
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

  finishSignUp(email, username, avatar, cid) {
    console.log(email, username, avatar, cid);
    return this.http
      .post<any>(this.userApiUrl + '/cognito/signup-step2/', {
        email,
        username,
        avatar,
        cid,
      })
      .subscribe(() => {
        this.fetchUserInfo(this.getAccessToken());
      });
  }

  // Sign out method
  signOut() {
    // Clear tokens and user info from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_info');
    this.accessToken = null;

    this.toastr.info('Nous espérons vous revoir bientôt !', 'A bientôt!', {
      progressBar: true,
    });
    this.router.navigateByUrl('/');
  }

  getUserIdFromCid(cid: string): Observable<string> {
    return this.http.get<any>(this.userApiUrl + '/user/cid/' + cid).pipe(
      map((response) => {
        return response.id;
      })
    );
  }
}
