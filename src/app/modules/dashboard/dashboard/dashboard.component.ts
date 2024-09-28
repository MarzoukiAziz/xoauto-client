import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  cognitoAuthUrl = `${environment.cognitoHostedUiUrl}/oauth2/authorize?client_id=${environment.cognitoAppClientId}&response_type=code&scope=email+openid+phone&redirect_uri=${environment.cognitoRedirectUrl}`;
  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    if (!this.auth.isAuthenticated()) {
      window.location.href = this.cognitoAuthUrl;
    }
  }
}
