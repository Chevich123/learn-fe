import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, switchMap } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  private readonly url = 'http://localhost:3000/images';

  uploadImage(
    formData: FormData,
  ): Observable<{ originalname: string; filename: string }> {
    return this.http.post<{ originalname: string; filename: string }>(
      'http://localhost:3000/images',
      formData,
    );
  }

  imagePreview(imageUrl: string | undefined): Observable<SafeUrl> {
    return this.http
      .get(`${this.url}/${imageUrl}`, { responseType: 'blob' })
      .pipe(
        switchMap((imageBlob) => {
          const sub$ = new Subject<SafeUrl>();
          const reader = new FileReader();

          reader.onload = (event: any) => {
            const imageUrl = event.target.result;
            sub$.next(this.sanitizer.bypassSecurityTrustUrl(imageUrl));
            sub$.complete();
          };
          reader.readAsDataURL(imageBlob);

          return sub$;
        }),
      );
  }
}
