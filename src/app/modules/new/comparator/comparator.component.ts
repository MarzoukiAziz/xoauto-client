import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Version } from '../new.types';
import { NewService } from '../new.service';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { NoAdsComponent } from '../../ad/components/no-ads/no-ads.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-comparator',
  standalone: true,
  imports: [BreadcrumbComponent, CommonModule, RouterLink, NoAdsComponent],
  templateUrl: './comparator.component.html',
  styleUrl: './comparator.component.css',
})
export class ComparatorComponent {
  versions: Version[] = [];
  all = true;
  indoor = new Set();
  features = new Set();
  motor = new Set();
  transmission = new Set();
  dimensions = new Set();
  performance = new Set();
  consumption = new Set();
  safety_equipment = new Set();
  driving_aids = new Set();
  outdoor_equipment = new Set();
  multimedia = new Set();
  functional_equipment = new Set();
  currency = environment.CURRENCY;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _newService: NewService
  ) {}

  ngOnInit(): void {
    this._newService.versions$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((versions: Version[]) => {
        this.versions = versions;

        this.versions.forEach((version) => {
          const techSheet = version.technical_sheet;

          // Indoor Equipment
          if (techSheet.indoor_equipment) {
            Object.keys(techSheet.indoor_equipment).forEach((key) =>
              this.indoor.add(key)
            );
          }

          // Features
          if (techSheet.features) {
            Object.keys(techSheet.features).forEach((key) =>
              this.features.add(key)
            );
          }

          // Motor
          if (techSheet.motor) {
            Object.keys(techSheet.motor).forEach((key) => this.motor.add(key));
          }

          // Transmission
          if (techSheet.transmission) {
            Object.keys(techSheet.transmission).forEach((key) =>
              this.transmission.add(key)
            );
          }

          // Dimensions
          if (techSheet.dimensions) {
            Object.keys(techSheet.dimensions).forEach((key) =>
              this.dimensions.add(key)
            );
          }

          // Performance
          if (techSheet.performance) {
            Object.keys(techSheet.performance).forEach((key) =>
              this.performance.add(key)
            );
          }

          // Consumption
          if (techSheet.consumption) {
            Object.keys(techSheet.consumption).forEach((key) =>
              this.consumption.add(key)
            );
          }

          // Safety Equipment
          if (techSheet.safety_equipment) {
            Object.keys(techSheet.safety_equipment).forEach((key) =>
              this.safety_equipment.add(key)
            );
          }

          // Driving Aids
          if (techSheet.driving_aids) {
            Object.keys(techSheet.driving_aids).forEach((key) =>
              this.driving_aids.add(key)
            );
          }

          // Outdoor Equipment
          if (techSheet.outdoor_equipment) {
            Object.keys(techSheet.outdoor_equipment).forEach((key) =>
              this.outdoor_equipment.add(key)
            );
          }

          // Multimedia
          if (techSheet.multimedia) {
            Object.keys(techSheet.multimedia).forEach((key) =>
              this.multimedia.add(key)
            );
          }

          // Functional Equipment
          if (techSheet.functional_equipment) {
            Object.keys(techSheet.functional_equipment).forEach((key) =>
              this.functional_equipment.add(key)
            );
          }
        });

        this._changeDetectorRef.markForCheck();
      });
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  removeFromComparator(id) {
    this._newService.removeFromCompare(id);
  }
}
