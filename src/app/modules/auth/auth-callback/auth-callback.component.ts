import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.css',
  imports: [LoaderComponent],
  standalone: true,
})
export class AuthCallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private auth: AuthService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const authCode = params['code'];
      this.auth.exchangeCodeForToken(authCode);
    });
  }
}
