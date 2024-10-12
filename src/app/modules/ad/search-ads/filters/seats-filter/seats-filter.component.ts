import { Component, ViewChild } from '@angular/core';
import { AdService } from '../../../ad.service';
import { CommonModule } from '@angular/common';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, NgbPopover, FormsModule],
  selector: 'ad-seats-filter',
  standalone: true,
  templateUrl: './seats-filter.component.html',
  styleUrl: '../filter-item.css',
})
export class SeatsFilterComponent {
  seats = [2, 3, 4, 5, 6, 7, 8, 9];

  @ViewChild('popOver1') public popover1!: NgbPopover;
  constructor(public _adService: AdService) {}

  toggleSeat(seat) {
    const index = this._adService.selectedSeats.indexOf(seat);
    if (index === -1) {
      this._adService.selectedSeats.push(seat);
    } else {
      this._adService.selectedSeats.splice(index, 1);
    }
  }

  isSelected(seat) {
    return this._adService.selectedSeats.includes(seat);
  }

  resetSeats() {
    this._adService.selectedSeats = [];
  }
  updateResult() {
    this._adService.currentPage = 1;
    this._adService.getAds().subscribe();
    if (this.popover1.isOpen()) this.popover1.close();
  }
}
