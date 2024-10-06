import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Import environment configuration
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryUploadService {
  // Retrieve Cloudinary credentials from the environment
  CLOUD_NAME = environment.CLOUD_NAME;
  API_KEY = environment.API_KEY;

  // Constructor to inject HttpClient for making HTTP requests
  constructor(private http: HttpClient) {}

  // Method to upload avatar image to Cloudinary
  uploadAvatar(timestamp, signature, file, uid): Observable<any> {
    // Create a FormData object to append image and additional parameters
    const form = new FormData();
    form.append('file', file);
    form.append('folder', 'avatars');
    form.append('public_id', uid);

    // Construct the Cloudinary upload URL with credentials and parameters
    return this.http.post(
      `https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/image/upload?api_key=${this.API_KEY}&timestamp=${timestamp}&signature=${signature}`,
      form
    );
  }

  uploadAdPic(timestamp, signature, file): Observable<any> {
    // Create a FormData object to append image and additional parameters
    const form = new FormData();
    form.append('file', file);
    form.append('folder', 'adPics');

    // Construct the Cloudinary upload URL with credentials and parameters
    return this.http.post(
      `https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/image/upload?api_key=${this.API_KEY}&timestamp=${timestamp}&signature=${signature}`,
      form,
      { withCredentials: false }
    );
  }

  uploadAdVideo(timestamp, signature, file): Observable<any> {
    // Create a FormData object to append image and additional parameters
    const form = new FormData();
    form.append('file', file);
    form.append('folder', 'adVids');

    // Construct the Cloudinary upload URL with credentials and parameters
    return this.http.post(
      `https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/video/upload?api_key=${this.API_KEY}&timestamp=${timestamp}&signature=${signature}`,
      form,
      { withCredentials: false }
    );
  }

  getAdPicSignature(): Observable<any> {
    // Make an HTTP GET request to the server to obtain Cloudinary signature
    return this.http.get<any>(environment.apiserver + '/cloudinary/adpics');
  }

  getVideoSignature(): Observable<any> {
    // Make an HTTP GET request to the server to obtain Cloudinary signature
    return this.http.get<any>(environment.apiserver + '/cloudinary/adVids');
  }

  // Method to get Cloudinary signature for the specified user ID
  getSignature(uid): Observable<any> {
    // Make an HTTP GET request to the server to obtain Cloudinary signature
    return this.http.get<any>(environment.apiserver + '/api/cloudinary/' + uid);
  }
}
