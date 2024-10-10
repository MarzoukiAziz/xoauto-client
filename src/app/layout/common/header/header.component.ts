import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { menuItemsData } from 'src/app/shared/data/menu-data';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [CommonModule, FormsModule, RouterLink],
  standalone: true,
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
