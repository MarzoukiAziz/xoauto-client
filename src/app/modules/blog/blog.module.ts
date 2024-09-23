import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';

@NgModule({
  declarations: [ArticleListComponent, ArticleDetailComponent],
  imports: [CommonModule, BlogRoutingModule],
})
export class BlogModule {}
