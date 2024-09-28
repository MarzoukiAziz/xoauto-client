import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {
  private routeSub: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSub = this.route.queryParams.subscribe((params) => {
      console.log(params); // Logs the query params
      const paramValue = params['yourParam']; // Get a specific query param value
      console.log(paramValue);
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe(); // Don't forget to unsubscribe to avoid memory leaks
  }
}
