import { Component, Input } from '@angular/core';

@Component({
  selector: 'ad-contact-buttons',
  standalone: true,
  imports: [],
  templateUrl: './contact-buttons.component.html',
  styleUrl: './contact-buttons.component.css',
})
export class ContactButtonsComponent {
  @Input() phoneNumber: string = '';
}
