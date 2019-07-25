import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { ProductPhotoHttpService } from 'src/app/services/http/product-photo-http.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-photos-edit-modal',
  templateUrl: './product-photos-edit-modal.component.html',
  styleUrls: ['./product-photos-edit-modal.component.css']
})
export class ProductPhotosEditModalComponent implements OnInit {

  private errors: Array<any> = [];
  private productId: number;

  @ViewChild(ModalComponent)
  modal: ModalComponent;

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

  editPhoto(files: FileList) {
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

  showModal() {
    this.modal.show();
  }

  showErrors() {
    return Object.keys(this.errors).length !== 0;
  }

}
