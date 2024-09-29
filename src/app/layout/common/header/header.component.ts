import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(public auth: AuthService) {}
  isMobileNavExpanded = false;

  toggleMobileNav() {
    this.isMobileNavExpanded = !this.isMobileNavExpanded;
    document.body.classList.toggle('locked', this.isMobileNavExpanded);
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
        { label: 'Annonces Du Jour', link: 'ad/today' },
        { label: 'Comparateur', link: 'ads-comparator' },
      ],
    },
    { label: 'Magazine', link: '/blog' },
  ];
}
