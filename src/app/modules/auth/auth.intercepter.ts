import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
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
    totalRequests++;
    loadingService.setLoading(true);
    const authToken = this.authService.getAccessToken();
    const notCloudinary = !req.url.includes('https://api.cloudinary.com');
    if (authToken && notCloudinary) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      });

      return next.handle(authReq).pipe(
        finalize(() => {
          totalRequests--;
          if (totalRequests == 0) {
            loadingService.setLoading(false);
          }
        })
      );
    }
    return next.handle(req).pipe(
      finalize(() => {
        totalRequests--;
        if (totalRequests == 0) {
          loadingService.setLoading(false);
        }
      })
    );
  }
}
