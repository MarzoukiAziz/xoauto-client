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

/**
 * Blog resolver
 *
 * @param route
 * @param state
 */
const articleResolver = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const blogService = inject(BlogService);
  const router = inject(Router);

  return blogService.getArticleById(route.paramMap.get('id')).pipe(
    // Error here means the requested article is not available
    catchError((error) => {
      // Log the error
      console.error(error);

      // Get the parent url
      const parentUrl = state.url.split('/').slice(0, -1).join('/');

      // Navigate to there
      router.navigateByUrl(parentUrl);

      // Throw an error
      return throwError(error);
    })
  );
};

export default [
  {
    path: '',
    component: BlogComponent,
    resolve: {
      articles: () => inject(BlogService).getArticles(),
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ArticleListComponent,
        resolve: {
          articles: () => inject(BlogService).getArticles(),
        },
      },
      {
        path: ':id',
        component: ArticleDetailComponent,
        resolve: {
          article: articleResolver,
        },
      },
    ],
  },
] as Routes;
