import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductPhotoHttpService } from 'src/app/services/http/product-photo-http.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-photos-upload',
  templateUrl: './product-photos-upload.component.html',
  styleUrls: ['./product-photos-upload.component.css']
})
export class ProductPhotosUploadComponent implements OnInit {

  private errors: Array<any> = [];
  private productId: number;

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(
    private productPhotoHttp: ProductPhotoHttpService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params.product;
    });
  }

  uploadPhotos(files: FileList) {
    if (!files.length) {
      return;
    }
    const success = data => {
      this.onSuccess.emit(data);
    };
    const error = (responseError) => {
      if (responseError.status === 422) {
        this.errors = responseError.error.errors;
      }
      this.onError.emit(responseError);
    };
    this.productPhotoHttp
        .create(this.productId, files)
        .subscribe(success, error);
  }

  showErrors() {
    return Object.keys(this.errors).length !== 0;
  }
}
