import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NewService } from '../../../new.service';

@Component({
  imports: [CommonModule, NgbPopover, FormsModule],
  selector: 'seats-filter',
  standalone: true,
  templateUrl: './seats-filter.component.html',
  styleUrl: '../filter-item.css',
})
export class SeatsFilterComponent {
  seats = [2, 3, 4, 5, 6, 7, 8, 9];

  @ViewChild('popOver1') public popover1!: NgbPopover;
  constructor(public _newService: NewService) {}

  toggleSeat(seat) {
    const index = this._newService.selectedSeats.indexOf(seat);
    if (index === -1) {
      this._newService.selectedSeats.push(seat);
    } else {
      this._newService.selectedSeats.splice(index, 1);
    }
  }

  isSelected(seat) {
    return this._newService.selectedSeats.includes(seat);
  }

  resetSeats() {
    this._newService.selectedSeats = [];
  }
  updateResult() {
    this._newService.currentPage = 1;
    this._newService.getModels().subscribe();
    if (this.popover1.isOpen()) this.popover1.close();
  }
}
