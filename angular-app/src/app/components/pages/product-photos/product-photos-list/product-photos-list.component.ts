import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductPhotoHttpService } from 'src/app/services/http/product-photo-http.service';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { PhotosInterface } from 'src/app/interfaces/photos.interface';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { ProductPhotosEditModalComponent } from '../product-photos-edit-modal/product-photos-edit-modal.component';

declare const $;

@Component({
  selector: 'app-product-photos-list',
  templateUrl: './product-photos-list.component.html',
  styleUrls: ['./product-photos-list.component.css']
})
export class ProductPhotosListComponent implements OnInit {

  private productId: number;
  private product: ProductInterface;
  private photos: PhotosInterface[];
  photoIdToEdit: number;

  @ViewChild(ProductPhotosEditModalComponent)
  editModal: ProductPhotosEditModalComponent;

  constructor(
    private productPhotoHttp: ProductPhotoHttpService,
    private route: ActivatedRoute,
    private notifyMessage: NotifyMessageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params.product;
      this.getPhotos();
      this.configFancybox();
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

  onInsertSuccess(data: { photos: PhotosInterface[] }) {
    this.photos.push(...data.photos); // ... converte um array para algo assim: photo1 photo2 photo3 ...
    this.notifyMessage.success('Foto(s) adicionada(s) com sucesso!');
  }

  onEditSuccess(photo: PhotosInterface) {
    $.fancybox.getInstance().close();
    const index = this.photos.findIndex((ph: PhotosInterface) => {
      return ph.id === this.photoIdToEdit;
    });
    this.photos[index] = photo;
    this.notifyMessage.success('Foto substituída com sucesso!');
    this.editModal.hideModal();
  }

  configFancybox() {
    $.fancybox.defaults.btnTpl.edit = `
      <a class="fancybox-button" data-fancybox-edit title="Substituir" href="javascript:void(0)" style="text-align: center">
        <i class="fas fa-edit"></i>
      </a>
    `;
    $.fancybox.defaults.buttons = ['download', 'edit'];
    $('body').on('click', '[data-fancybox-edit]', () => {
      const photoId = this.getPhotoIdFromSlideShow();
      this.photoIdToEdit = photoId;
      this.editModal.showModal();
    });
  }

  getPhotoIdFromSlideShow() {
    const src = $('.fancybox-slide--current .fancybox-image').attr('src');
    const id  = $('[data-fancybox="gallery"]').find(`[src='${src}']`).attr('id');
    return id.split('-')[1];
  }
}
