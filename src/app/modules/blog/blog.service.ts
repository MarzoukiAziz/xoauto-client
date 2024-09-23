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
import { Article, Comment } from './blog.types';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  // API URL
  private apiUrl = environment.apiserver;

  // Private
  private _articles: BehaviorSubject<Article[]> = new BehaviorSubject([]);
  private _article: BehaviorSubject<Article | null> = new BehaviorSubject(null);
  private _count: BehaviorSubject<Number> = new BehaviorSubject<Number>(0);
  private _categories: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private _comments: BehaviorSubject<Comment[]> = new BehaviorSubject([]);

  //public
  public loading = false;

  //Constructor
  constructor(private _httpClient: HttpClient) {}

  // @ Accessors
  // Getter for articles
  get articles$(): Observable<Article[]> {
    return this._articles.asObservable();
  }

  // Getter for articles
  get categories$(): Observable<string[]> {
    return this._categories.asObservable();
  }

  // Getter for article
  get article$(): Observable<Article> {
    return this._article.asObservable();
  }

  // Getter for comments
  get comments$(): Observable<Comment[]> {
    return this._comments.asObservable();
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
    this.loading = true;

    return this._httpClient
      .get<{ articles: Article[]; count: number }>(this.apiUrl + '/article', {
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
          this.loading = false;
        })
      );
  }

  // Get Article By Id
  getArticleById(id: string): Observable<Article> {
    return this._httpClient.get<Article>(this.apiUrl + '/article/' + id).pipe(
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

  // Get Categories
  getCategories(): Observable<string[]> {
    return this._httpClient
      .get<string[]>(this.apiUrl + '/settings/article-categories/names')
      .pipe(
        tap((response: string[]) => {
          this._categories.next(response);
        })
      );
  }

  // Get Comments
  getComments(id: string): Observable<Comment[]> {
    return this._httpClient
      .get<Comment[]>(this.apiUrl + '/comment/article/' + id)
      .pipe(
        tap((response: Comment[]) => {
          this._comments.next(response);
        })
      );
  }
}
