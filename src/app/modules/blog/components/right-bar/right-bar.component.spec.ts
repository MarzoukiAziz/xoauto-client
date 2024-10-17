import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RightBarComponent } from './right-bar.component';
import { BlogService } from '../../blog.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewAdBannerComponent } from 'src/app/shared/components/new-ad-banner/new-ad-banner.component';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

class MockBlogService {
  categories$ = of(['Category 1', 'Category 2']);

  getArticles() {
    return of({ articles: [], count: 0 }); // Mock response
  }
}

class MockActivatedRoute {
  // You can add more properties and methods as needed
  params = new BehaviorSubject({}); // Mocking route parameters
}

describe('RightBarComponent', () => {
  let component: RightBarComponent;
  let fixture: ComponentFixture<RightBarComponent>;
  let blogService: MockBlogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        NewAdBannerComponent,
        RightBarComponent,
      ],
      providers: [
        { provide: BlogService, useClass: MockBlogService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute }, // Add this line
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RightBarComponent);
    component = fixture.componentInstance;
    blogService = TestBed.inject(BlogService);
    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate categories on ngOnInit', () => {
    component.ngOnInit();
    expect(component.categories.length).toBe(2); // Assuming two categories are provided
  });

  it('should update selected category and call updateArticlesResult', () => {
    spyOn(component, 'updateArticlesResult');
    component.selectCategory('Category 1');
    expect(component.selectedCategory).toBe('Category 1');
    expect(component.updateArticlesResult).toHaveBeenCalled();
  });

  it('should call updateArticlesResult on keyword search', () => {
    spyOn(component, 'updateArticlesResult');
    component.keywords = 'test';
    component.updateArticlesResult();
    expect(component.updateArticlesResult).toHaveBeenCalled();
  });
});
