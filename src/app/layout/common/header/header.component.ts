import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isMobileNavExpanded = false;
  cognitoUrl = `${environment.cognitoHostedUiUrl}/login?client_id=${environment.cognitoAppClientId}&response_type=code&scope=email+openid+phone&redirect_uri=${environment.cognitoRedirectUrl}`;

  toggleMobileNav() {
    this.isMobileNavExpanded = !this.isMobileNavExpanded;
    document.body.classList.toggle('locked', this.isMobileNavExpanded);
  }
  public onLoginClick(): void {
    console.log('Redirecting to Cognito Hosted UI');
    window.location.assign(this.cognitoUrl);
  }

  menuItems: any[] = [
    { label: 'Acceuil', link: '/' },
    {
      label: 'Neuf',
      link: '#',
      children: [
        { label: 'Recherche', link: '/n/search' },
        { label: 'Marques', link: '/marques' },
        { label: 'Comparateur', link: '/n/comparateur' },
      ],
    },
    {
      label: 'Occasions',
      children: [
        { label: 'Recherche', link: 'ads' },
        { label: 'Annonces Du Jour', link: 'today-ads' },
        { label: 'Comparateur', link: 'ads-comparator' },
      ],
    },
    { label: 'Magazine', link: '/blog' },
  ];
}
