import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdService } from '../../../ad.service';
import { NgxDropzoneModule } from 'ngx-dropzone';

@Component({
  selector: 'step-four',
  standalone: true,
  imports: [CommonModule, NgxDropzoneModule],
  templateUrl: './step-four.component.html',
  styleUrl: './step-four.component.css',
})
export class StepFourComponent {
  constructor(public _adService: AdService) {}

  processing = false;

  // Selected  images
  files: File[] = [];
  video1: File;
  video2: File;

  showAlert = false;
  alertMessage = '';

  // Lifecycle hook called after component initialization
  ngOnInit(): void {}

  // Event handler for file selection
  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }
  onRemove(f: File) {
    this.files.splice(this.files.indexOf(f), 1);
  }

  onSelectVideo1(event: any) {
    this.video1 = event.addedFiles[0];
  }
  onRemoveVideo1() {
    this.video1 = null;
  }

  onSelectVideo2(event: any) {
    this.video2 = event.addedFiles[0];
  }
  onRemoveVideo2() {
    this.video2 = null;
  }

  verifyStepFour() {
    (this.alertMessage = ''), (this.showAlert = false);

    if (this.files.length < 3) {
      (this.alertMessage = 'Choisir au mois 3 photos!'),
        (this.showAlert = true);
      return;
    }

    this._adService.photos = this.files;
    this._adService.video1 = this.video1;
    this._adService.video2 = this.video2;

    this._adService.step = 5;
  }
  back() {
    this._adService.step = 3;
  }
}
