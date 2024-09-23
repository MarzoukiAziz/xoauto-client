import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
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
        { label: 'Annonces Du Jour', link: 'today-ads' },
        { label: 'Comparateur', link: 'ads-comparator' },
      ],
    },
    { label: 'Magazine', link: '/magazine' },
  ];
}
