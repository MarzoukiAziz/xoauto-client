import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Routes } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';
import { BrandsComponent } from './brands/brands.component';
import { NewService } from './new.service';
import { ModelsComponent } from './models/models.component';

const modelsResolver = (route: ActivatedRouteSnapshot) => {
  const newService = inject(NewService);
  const router = inject(Router);

  return newService.getModels(route.paramMap.get('brand') ?? '').pipe(
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

export default [
  {
    path: 'brands',
    component: BrandsComponent,
    resolve: { brands: () => inject(NewService).getSettings() },
  },
  {
    path: 'models/:brand',
    component: ModelsComponent,
    resolve: { models: modelsResolver, brand: brandResolver },
  },
] as Routes;
