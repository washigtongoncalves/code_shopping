import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductPhotosInterface } from 'src/app/interfaces/product-photos.interface';
import { environment } from '../../../environments/environment';

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

  getUrl(productId: number, photoId: number = null): string {
    let url = `${this.baseUrl}/products/${productId}/photos/`;
    if (photoId) {
      url += photoId;
    }
    return url;
  }
}
