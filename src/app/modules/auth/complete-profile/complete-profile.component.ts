import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CloudinaryUploadService } from 'src/app/shared/services/cloudinary-upload.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-complete-profile',
  standalone: true,
  imports: [CommonModule, NgxDropzoneModule],
  templateUrl: './complete-profile.component.html',
})
export class CompleteProfileComponent {
  email: string;
  id: string;

  file: File;

  constructor(
    public auth: AuthService,
    private cloud: CloudinaryUploadService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.auth.getUserInfo().id || !this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/user/dashboard');
      return;
    }

    this.route.queryParams.subscribe(({ email, id }) => {
      this.email = email;
      this.id = id;
    });
  }

  onSelect(event: any) {
    this.file = event.addedFiles[0];
  }

  onRemove(f: File) {
    this.file = null;
  }

  updateInfo(name) {
    if (name.length < 3) {
      this.toastr.error('Nom Trop Court !', 'Error', {
        progressBar: true,
      });
    } else if (this.file) {
      this.cloud.getSignature().subscribe((res) => {
        const { timestamp, signature } = res;

        this.cloud
          .uploadAvatar(timestamp, signature, this.file)
          .subscribe((res: any) => {
            this.auth.finishSignUp(
              this.email,
              name,
              res['secure_url'],
              this.id
            );
          });
      });
    } else {
      this.auth.finishSignUp(this.email, name, null, this.id);
    }
  }
}
