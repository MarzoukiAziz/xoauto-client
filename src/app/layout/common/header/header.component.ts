import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { MENU_ITEMS_DATA } from 'src/app/shared/data/menu-data';
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
  isSticky: boolean = false;

  constructor(public auth: AuthService) {
    this.menuItems = MENU_ITEMS_DATA;
  }

  toggleMobileNav() {
    this.isMobileNavExpanded = !this.isMobileNavExpanded;
    document.body.classList.toggle('locked', this.isMobileNavExpanded);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.isSticky = scrollTop > 50; // Add sticky class after scrolling 50px down
  }
}
