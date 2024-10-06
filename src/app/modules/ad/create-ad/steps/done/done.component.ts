import { ChangeDetectorRef, Component } from '@angular/core';
import { AdService } from '../../../ad.service';
import { Subject, takeUntil } from 'rxjs';
import { Ad } from '../../../ad.types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-done',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './done.component.html',
  styleUrl: './done.component.css',
})
export class DoneComponent {
  ad: Ad;

  private _unsubscribeAll: Subject<Ad> = new Subject<Ad>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public _adService: AdService
  ) {}

  ngOnInit(): void {
    this._adService.ad$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((ad: Ad) => {
        this.ad = ad;

        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
