import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'blog-right-bar',
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.css'],
  standalone: true,
})
export class RightBarComponent {
  constructor(
    private route: ActivatedRoute,
    public _blogService: BlogService
  ) {}
}
