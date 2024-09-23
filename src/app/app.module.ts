import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './layout/common/header/header.component';
import { FooterComponent } from './layout/common/footer/footer.component';
import { ClassicComponent } from './layout/layouts/classic/classic.component';
import { LayoutComponent } from './layout/layout.component';
import { TestComponent } from './modules/test/test.component';
import { ArticleListComponent } from './modules/blog/article-list/article-list.component';
import { ArticleDetailComponent } from './modules/blog/article-detail/article-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClassicComponent,
    LayoutComponent,
    TestComponent,
    ArticleListComponent,
    ArticleDetailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
