import { Component } from '@angular/core';
import { Brand, Model, Version } from '../new.types';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TechnicalSheetComponent } from '../components/technical-sheet/technical-sheet.component';
import { GallerieComponent } from '../components/gallerie/gallerie.component';
import { register } from 'swiper/element/bundle';
import { ModelCommentsComponent } from '../components/model-comments/model-comments.component';
import { SimilarAdsComponent } from '../../ad/components/similar-ads/similar-ads.component';
import { SimilarModelsComponent } from '../components/similar-models/similar-models.component';
register();

@Component({
  selector: 'app-model-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TechnicalSheetComponent,
    GallerieComponent,
    ModelCommentsComponent,
    SimilarAdsComponent,
    SimilarModelsComponent,
  ],
  templateUrl: './model-detail.component.html',
  styleUrl: './model-detail.component.css',
})
export class ModelDetailComponent {
  brand: Brand;
  model: Model;
  versions: Version[];
  similars = [];
  selected_version: Version;
  currency = environment.CURRENCY;
  selected_nav = 'details';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.brand = data['brand'];
      this.model = data['model'].ads[0];
      this.similars = data['similars'];
      this.versions = this.model.versions;
      this.selected_version = this.versions[0];
    });
  }

  changeVersion(newVersion) {
    this.selected_version = newVersion;
  }
  changeNav(newNav) {
    this.selected_nav = newNav;
  }
}
