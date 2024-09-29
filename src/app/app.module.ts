import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './layout/common/header/header.component';
import { FooterComponent } from './layout/common/footer/footer.component';
import { ClassicComponent } from './layout/layouts/classic/classic.component';
import { LayoutComponent } from './layout/layout.component';
import { TestComponent } from './modules/test/test.component';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthInterceptor } from './modules/auth/auth.intercepter';
import { SwiperDirective } from './shared/directives/swiper.directive';
import { register } from 'swiper/element/bundle';
register();
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClassicComponent,
    LayoutComponent,
    TestComponent,
    SwiperDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
