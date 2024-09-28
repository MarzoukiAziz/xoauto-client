import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Allow access if authenticated
    } else {
      // Redirect to the Cognito Hosted UI for authentication
      const cognitoAuthUrl = `${environment.cognitoHostedUiUrl}/oauth2/authorize?client_id=${environment.cognitoAppClientId}&response_type=code&scope=email+openid+phone&redirect_uri=${environment.cognitoRedirectUrl}`;
      window.location.href = cognitoAuthUrl;
      return false; // Prevent navigation
    }
  }
}
