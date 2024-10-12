import { ChangeDetectorRef, Component } from '@angular/core';
import { Ad } from '../ad.types';
import { Subject, takeUntil } from 'rxjs';
import { AdService } from '../ad.service';
import { CommonModule } from '@angular/common';
import { SwiperDirective } from 'src/app/shared/directives/swiper.directive';
import { SwiperOptions } from 'swiper/types';
import { AuthService } from '../../auth/auth.service';
import { CriteriaComponent } from '../components/criteria/criteria.component';
import { PhoneNumberPipe } from 'src/app/shared/pipes/phoneNumber.pipe';
import { RouterLink } from '@angular/router';
import { SimilarAdsComponent } from '../components/similar-ads/similar-ads.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
  standalone: true,
  imports: [
    CommonModule,
    SwiperDirective,
    CriteriaComponent,
    PhoneNumberPipe,
    RouterLink,
    SimilarAdsComponent,
  ],
})
export class DetailComponent {
  ad: Ad;
  phoneShowed = false;
  owner = false;
  adName = '';
  criteriaList = [];
  similars = [];
  currency = environment.CURRENCY;
  savedAds = [];
  showSaveOption = false;
  userId = '';

  private _unsubscribeAll: Subject<Ad> = new Subject<Ad>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _adService: AdService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this._auth.getUserInfo().id;
    this._adService.ad$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((ad: Ad) => {
        this.ad = ad;
        this.adName = ad.brand + ' ' + ad.model + ' ' + ad.version;
        this.owner = this.ad.uid._id == this.userId;
        this.criteriaList = this.getCriteria(ad);
        this._adService
          .getSimilars(ad.category, ad._id, ad.price)
          .subscribe((similars: Ad[]) => {
            this.similars = similars;
          });
        this._changeDetectorRef.markForCheck();
      });

    if (this._auth.isAuthenticated()) {
      this._adService.savedAds$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((savedAds: string[]) => {
          this.savedAds = savedAds;
          this.showSaveOption = true;
        });
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  swiperConfig: SwiperOptions = {
    pagination: true,
  };

  copyPhoneNumber(phone) {
    navigator.clipboard.writeText(phone).then(() => {
      const button = document.querySelector('.btn-phone');
      const tooltip = document.createElement('div');
      tooltip.className = 'mt-3 text-center';
      tooltip.innerHTML = '&nbsp;&nbsp; Numéro copié';
      button?.insertAdjacentElement('afterend', tooltip);

      // Remove the tooltip after 1 second
      setTimeout(() => {
        document
          .querySelectorAll('.linktooltips-container')
          .forEach((el) => el.remove());
      }, 1000);
    });
  }
  slideChange(swiper: any) {}

  getCriteria(ad: Ad) {
    return [
      {
        icon: 'drive.svg',
        criteria: 'Carrosserie',
        value: ad.category,
      },
      {
        icon: 'mileage.svg',
        criteria: 'Kilométrage',
        value: ad.mileage,
        unit: 'km',
        pipe: 'number',
        pipeArg: '1.0-0',
      },
      {
        icon: 'calendar.svg',
        criteria: 'Première mise en circulation',
        value: ad.first_registration.month + '/' + ad.first_registration.year,
      },
      { icon: 'energy.svg', criteria: 'Énergie', value: ad.fuel_type },
      { icon: 'color.svg', criteria: 'Couleur', value: ad.color },
      {
        icon: 'horse.png',
        criteria: 'Puissance en chevaux',
        value: ad.horsepower,
      },
      {
        icon: 'kw.png',
        criteria: 'Puissance en kw',
        value: ad.power_kw,
      },
      {
        icon: 'charging.png',
        criteria: 'Autonomie WLTP',
        value: ad.autonomy_wltp_km,
        unit: 'km',
      },
      {
        icon: 'seat.png',
        criteria: 'Nombre de Places',
        value: ad.seats,
      },
    ];
  }

  addToSavedAds(id: string) {
    this.savedAds.push(id);
    this._adService.updateSavedAds(this.userId, this.savedAds).subscribe();
  }
  removeFromSavedAds(id: string) {
    this.savedAds = this.savedAds.filter((item) => item !== id);
    this._adService.updateSavedAds(this.userId, this.savedAds).subscribe();
  }
  isAdSaved(id: string) {
    return this.savedAds.includes(id);
  }
}
