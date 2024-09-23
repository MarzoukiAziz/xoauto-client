import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';

import { catchError, throwError } from 'rxjs';
import { BlogService } from './blog.service';
import { BlogComponent } from './blog.component';
import { ArticleListComponent } from './list/article-list.component';
import { ArticleDetailComponent } from './details/article-detail.component';

const articleResolver = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const blogService = inject(BlogService);
  const router = inject(Router);

  return blogService.getArticleById(route.paramMap.get('id')).pipe(
    catchError((error) => {
      console.error(error);
      const parentUrl = state.url.split('/').slice(0, -1).join('/');
      router.navigateByUrl(parentUrl);
      return throwError(error);
    })
  );
};

export default [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ArticleListComponent,
        resolve: {
          articles: () => inject(BlogService).getArticles(),
          categories: () => inject(BlogService).getCategories(),
        },
      },
      {
        path: ':id',
        component: ArticleDetailComponent,
        resolve: {
          article: articleResolver,
          comments: (route: ActivatedRouteSnapshot) =>
            inject(BlogService).getComments(route.paramMap.get('id')),
        },
      },
    ],
  },
] as Routes;
