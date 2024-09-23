import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Article } from './blog.types';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  // API URL
  private apiUrl = environment.apiserver + '/article';

  // Private
  private _articles: BehaviorSubject<Article[]> = new BehaviorSubject([]);
  private _article: BehaviorSubject<Article | null> = new BehaviorSubject(null);
  private _count: BehaviorSubject<Number> = new BehaviorSubject<Number>(0);

  //Constructor
  constructor(private _httpClient: HttpClient) {}

  // @ Accessors
  // Getter for articles
  get articles$(): Observable<Article[]> {
    return this._articles.asObservable();
  }

  // Getter for article
  get article$(): Observable<Article> {
    return this._article.asObservable();
  }

  // Getter for count
  get count$(): Observable<Number> {
    return this._count.asObservable();
  }

  // @ Public methods
  // Get Articles
  getArticles(
    page: number = 1,
    keywords: string = '',
    category: string = '',
    sort: string = 'desc'
  ): Observable<Article[]> {
    return this._httpClient
      .get<{ articles: Article[]; count: number }>(this.apiUrl, {
        params: {
          category,
          keywords,
          size: 8,
          page,
          sort,
        },
      })
      .pipe(
        tap((response: any) => {
          this._articles.next(response.articles);
          this._count.next(response.count);
        })
      );
  }

  // Get Article By Id
  getArticleById(id: string): Observable<Article> {
    return this._httpClient.get<Article>(this.apiUrl + '/' + id).pipe(
      map((article) => {
        this._article.next(article);
        return article;
      }),
      switchMap((article) => {
        if (!article) {
          return throwError('Could not found article with id of ' + id + '!');
        }

        return of(article);
      })
    );
  }
}
