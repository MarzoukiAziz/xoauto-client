import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { menuItemsData } from 'src/app/shared/data/menu-data';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isMobileNavExpanded = false;
  menuItems = {};

  constructor(public auth: AuthService) {
    this.menuItems = menuItemsData;
  }

  toggleMobileNav() {
    this.isMobileNavExpanded = !this.isMobileNavExpanded;
    document.body.classList.toggle('locked', this.isMobileNavExpanded);
  }
}
