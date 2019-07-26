import { Component, OnInit, EventEmitter, Output, ViewChild, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ProductPhotoHttpService } from 'src/app/services/http/product-photo-http.service';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-photos-delete-modal',
  templateUrl: './product-photos-delete-modal.component.html',
  styleUrls: ['./product-photos-delete-modal.component.css']
})
export class ProductPhotosDeleteModalComponent implements OnInit {

  private productId: number;

  @Input()
  photoId: number;

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

  deletePhoto() {
    const success = () => {
      this.onSuccess.emit(true);
    };
    const error = (responseError) => {
      this.onError.emit(responseError);
    };
    this.productPhotoHttp
        .delete(this.productId, this.photoId)
        .subscribe(success, error);
  }

  showModal() {
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }
}
