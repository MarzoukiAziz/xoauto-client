import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Routes } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';
import { BrandsComponent } from './brands/brands.component';
import { NewService } from './new.service';

export default [
  {
    path: 'brands',
    component: BrandsComponent,
    resolve: { brands: () => inject(NewService).getSettings() },
  },
] as Routes;
