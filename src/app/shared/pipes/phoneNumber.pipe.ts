import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber',
  standalone: true,
})
export class PhoneNumberPipe implements PipeTransform {
  transform(phoneNumber: string): string {
    // Remove all non-numeric characters
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');

    // Format the number (assuming 8 digits: 54 434 423)
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})$/);

    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`;
    }

    return phoneNumber; // If the number is invalid, return the original input
  }
}
