import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductPhotosInterface } from 'src/app/interfaces/product-photos.interface';
import { environment } from '../../../environments/environment';
import { PhotosInterface } from 'src/app/interfaces/photos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductPhotoHttpService {

  protected baseUrl = `${environment.api.url}`;

  constructor(private http: HttpClient) {}

  list(productId: number): Observable<ProductPhotosInterface> {
    return this.http.get<{ data: any }>(
      this.getUrl(productId)
    ).pipe(
      map((response) => response.data)
    );
  }

  create(productId: number, files: FileList): Observable<ProductPhotosInterface> {
    const formData = new FormData();
    const filesArray = Array.from(files);
    filesArray.forEach(file => {
      formData.append('photos[]', file);
    });
    return this.http.post<any>(this.getUrl(productId), formData);
  }

  update(productId: number, photoId: number, file: File): Observable<PhotosInterface> {
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('_method', 'PUT');
    const url = this.getUrl(productId, photoId);
    return this.http.post<any>(url, formData).pipe(
      map((response) => response.data)
    );
  }

  delete(productId: number, photoId: number): Observable<any> {
    let url = `${this.baseUrl}/products/${productId}/photos/${photoId}`;
    return this.http.delete(url);
  }

  getUrl(productId: number, photoId: number = null): string {
    let url = `${this.baseUrl}/products/${productId}/photos/`;
    if (photoId) {
      url += photoId;
    }
    return url;
  }
}
