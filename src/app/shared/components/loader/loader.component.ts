import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class LoaderComponent {}
