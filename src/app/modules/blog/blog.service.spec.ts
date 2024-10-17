import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BlogService } from './blog.service';
import { Article, Comment } from './blog.types';
import { environment } from 'src/environments/environment.prod';

describe('BlogService', () => {
  let service: BlogService;
  let httpMock: HttpTestingController;
  const blogApiUrl = environment.blogServiceApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlogService],
    });
    service = TestBed.inject(BlogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getArticles', () => {
    it('should retrieve articles and update the count', () => {
      const dummyArticles: Article[] = [
        {
          _id: '1',
          title: 'Test Article 1',
          previewImg: 'image1.jpg',
          content: 'Content 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          views: 100,
          commentCount: 2,
        },
        {
          _id: '2',
          title: 'Test Article 2',
          previewImg: 'image2.jpg',
          content: 'Content 2',
          createdAt: new Date(),
          updatedAt: new Date(),
          views: 150,
          commentCount: 5,
        },
      ];
      const dummyResponse = { articles: dummyArticles, count: 2 };

      service.getArticles(1, '', '', 'desc').subscribe((_) => {
        service.articles$.subscribe((articles) => {
          expect(articles).toEqual(dummyArticles);
        });
      });

      const req = httpMock.expectOne(
        `${blogApiUrl}/article?category=&keywords=&size=8&page=1&sort=desc`
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);

      service.count$.subscribe((count) => {
        expect(count).toEqual(2);
      });
    });
  });

  describe('#getArticleById', () => {
    it('should retrieve an article by ID', () => {
      const dummyArticle: Article = {
        _id: '1',
        title: 'Test Article',
        previewImg: 'test-image.jpg',
        content: 'Test Content',
        createdAt: new Date(),
        updatedAt: new Date(),
        views: 100,
        commentCount: 3,
        comments: [],
      };

      service.getArticleById('1').subscribe((article) => {
        expect(article).toEqual(dummyArticle);
      });

      const req = httpMock.expectOne(`${blogApiUrl}/article/1?view=true`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyArticle);
    });

    it('should return an error when article not found', () => {
      service.getArticleById('999').subscribe({
        next: () => fail('Should have thrown an error'),
        error: (error) =>
          expect(error).toBe('Could not found article with id of 999!'),
      });

      const req = httpMock.expectOne(`${blogApiUrl}/article/999?view=true`);
      req.flush(null);
    });
  });

  describe('#getCategories', () => {
    it('should retrieve categories and update BehaviorSubject', () => {
      const dummyCategories: string[] = ['Tech', 'Health'];

      service.getCategories().subscribe((categories) => {
        expect(categories).toEqual(dummyCategories);
      });

      const req = httpMock.expectOne(
        `${blogApiUrl}/settings/article-categories/names`
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyCategories);
    });
  });

  describe('#getComments', () => {
    it('should retrieve comments for a specific article', () => {
      const dummyComments: Comment[] = [
        {
          _id: '1',
          uid: 'user1',
          user: { name: 'User 1' },
          articleId: '1',
          content: 'Great article!',
          answerTo: '',
          createdAt: new Date(),
          replies: [],
        },
        {
          _id: '2',
          uid: 'user2',
          user: { name: 'User 2' },
          articleId: '1',
          content: 'Very informative.',
          answerTo: '',
          createdAt: new Date(),
          replies: [],
        },
      ];

      service.getComments('1').subscribe((comments) => {
        expect(comments).toEqual(dummyComments);
      });

      const req = httpMock.expectOne(`${blogApiUrl}/comment/article/1`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyComments);
    });
  });

  describe('#createComment', () => {
    it('should create a comment and update BehaviorSubject', () => {
      const dummyComment: Comment = {
        _id: '1',
        uid: 'user1',
        user: { name: 'User 1' },
        articleId: '1',
        content: 'Nice post!',
        answerTo: '',
        createdAt: new Date(),
        replies: [],
      };
      const commentPayload = {
        content: 'Nice post!',
        articleId: '1',
        uid: 'user1',
        answerTo: '',
      };

      service.createComment(commentPayload).subscribe((response) => {
        expect(response).toEqual([dummyComment]);
      });

      const req = httpMock.expectOne(`${blogApiUrl}/comment`);
      expect(req.request.method).toBe('POST');
      req.flush([dummyComment]);
    });
  });
});
