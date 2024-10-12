import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Routes } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';
import { BrandsComponent } from './brands/brands.component';
import { NewService } from './new.service';
import { ModelsComponent } from './models/models.component';
import { ModelDetailComponent } from './model-detail/model-detail.component';
import { ComparatorComponent } from './comparator/comparator.component';
import { SearchModelsComponent } from './search-models/search-models.component';

const modelsResolver = (route: ActivatedRouteSnapshot) => {
  const newService = inject(NewService);
  const router = inject(Router);

  return newService.getModelsByBrand(route.paramMap.get('brand') ?? '').pipe(
    catchError((error) => {
      console.error(error);
      router.navigateByUrl('/new/brands');
      return throwError(error);
    })
  );
};

const brandResolver = (route: ActivatedRouteSnapshot) => {
  const newService = inject(NewService);
  const router = inject(Router);

  return newService.getBrand(route.paramMap.get('brand') ?? '').pipe(
    catchError((error) => {
      console.error(error);
      router.navigateByUrl('/new/brands');
      return throwError(error);
    })
  );
};

const modelResolver = (route: ActivatedRouteSnapshot) => {
  const newService = inject(NewService);
  const router = inject(Router);

  return newService
    .getModel(route.paramMap.get('brand'), route.paramMap.get('model'))
    .pipe(
      catchError((error) => {
        console.error(error);
        router.navigateByUrl('/new/brands');
        return throwError(error);
      })
    );
};
export default [
  {
    path: 'brands',
    component: BrandsComponent,
    resolve: { brands: () => inject(NewService).getSettings() },
  },
  {
    path: 'search',
    component: SearchModelsComponent,
    resolve: {
      models: () => inject(NewService).getModels(),
      settings: () => inject(NewService).getSettings(),
    },
  },
  {
    path: 'comparator',
    component: ComparatorComponent,
    resolve: {
      versions: () => inject(NewService).getVersionsForComparator(),
    },
  },
  {
    path: 'models/:brand',
    component: ModelsComponent,
    resolve: { models: modelsResolver, brand: brandResolver },
  },
  {
    path: ':brand/:model',
    component: ModelDetailComponent,
    resolve: { model: modelResolver, brand: brandResolver },
  },
] as Routes;
