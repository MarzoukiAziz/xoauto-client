import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { finalize, Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

let totalRequests = 0;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const loadingService = inject(LoadingService);
    const showLoader =
      !req.url.includes('comment') &&
      !req.url.includes('similars') &&
      !req.url.includes('search');

    if (showLoader) {
      totalRequests++;
      loadingService.setLoading(true);
    }

    const authToken = this.authService.getAccessToken();
    const notCloudinary = !req.url.includes('https://api.cloudinary.com');

    let authReq = req;
    if (authToken && notCloudinary) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.signOut();
        }
        return throwError(() => error);
      }),
      finalize(() => {
        if (showLoader) {
          totalRequests--;
          if (totalRequests == 0) {
            loadingService.setLoading(false);
          }
        }
      })
    );
  }
}
