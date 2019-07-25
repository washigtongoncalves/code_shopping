import { Component, OnInit } from '@angular/core';
import { ProductPhotoHttpService } from 'src/app/services/http/product-photo-http.service';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { PhotosInterface } from 'src/app/interfaces/photos.interface';

@Component({
  selector: 'app-product-photos-list',
  templateUrl: './product-photos-list.component.html',
  styleUrls: ['./product-photos-list.component.css']
})
export class ProductPhotosListComponent implements OnInit {

  private productId: number;
  private product: ProductInterface;
  private photos: PhotosInterface[];

  constructor(
    private productPhotoHttp: ProductPhotoHttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params.product;
      this.getPhotos();
    });
  }

  getPhotos() {
    this.productPhotoHttp
        .list(this.productId)
        .subscribe(data => {
          this.product = data.product;
          this.photos = data.photos;
        });
  }
}
