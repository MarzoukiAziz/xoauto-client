import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

const userResolver = () => {
  const userService = inject(UserService);

  return userService.getCurrentUser().pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
};

export default [
  {
    path: '',
    component: UserComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: userResolver,
    },
    children: [],
  },
] as Routes;
