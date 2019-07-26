import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductPhotoHttpService } from 'src/app/services/http/product-photo-http.service';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { PhotosInterface } from 'src/app/interfaces/photos.interface';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { ProductPhotosEditModalComponent } from '../product-photos-edit-modal/product-photos-edit-modal.component';
import { ProductPhotosDeleteModalComponent } from 'src/app/components/pages/product-photos/product-photos-delete-modal/product-photos-delete-modal.component';

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
  photoIdToDelete: number;

  @ViewChild(ProductPhotosEditModalComponent)
  editModal: ProductPhotosEditModalComponent;

  @ViewChild(ProductPhotosDeleteModalComponent)
  deleteModal: ProductPhotosDeleteModalComponent

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
    // const index = this.photos.findIndex((ph: PhotosInterface) => {
    //  return ph.id === this.photoIdToEdit;
    // });
    // this.photos[index] = photo;
    this.getPhotos();
    this.notifyMessage.success('Foto substituída com sucesso!');
    this.editModal.hideModal();
  }

  onDeleteSuccess() {
    $.fancybox.getInstance().close();
    this.getPhotos();
    this.notifyMessage.success('Foto excluída com sucesso!');
    this.deleteModal.hideModal();
  }

  onDeleteError() {
    this.notifyMessage.error('Ocorreu um erro ao excluir a foto!');
    this.deleteModal.hideModal();
  }

  configFancybox() {
    $.fancybox.defaults.btnTpl.edit = `
      <a class="fancybox-button" data-fancybox-edit title="Substituir" href="javascript:void(0)" style="text-align: center">
        <i class="fas fa-edit"></i>
      </a>
    `;
    $.fancybox.defaults.btnTpl.delete = `
      <a class="fancybox-button" data-fancybox-delete title="Remover foto" href="javascript:void(0)" style="text-align: center">
        <i class="fas fa-trash-alt"></i>
      </a>
    `;
    $.fancybox.defaults.buttons = ['download', 'edit', 'delete'];
    $('body').on('click', '[data-fancybox-edit]', () => {
      const photoId = this.getPhotoIdFromSlideShow();
      this.photoIdToEdit = photoId;
      this.editModal.showModal();
    });
    $('body').on('click', '[data-fancybox-delete]', () => {
      const photoId = this.getPhotoIdFromSlideShow();
      this.photoIdToDelete = photoId;
      this.deleteModal.showModal();
    });
  }

  getPhotoIdFromSlideShow() {
    const src = $('.fancybox-slide--current .fancybox-image').attr('src');
    const id  = $('[data-fancybox="gallery"]').find(`[src='${src}']`).attr('id');
    return id.split('-')[1];
  }
}
