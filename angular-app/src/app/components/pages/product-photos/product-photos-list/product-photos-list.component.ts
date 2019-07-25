import { Component, OnInit } from '@angular/core';
import { ProductPhotoHttpService } from 'src/app/services/http/product-photo-http.service';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { PhotosInterface } from 'src/app/interfaces/photos.interface';
import { NotifyMessageService } from 'src/app/services/notify-message.service';

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

  configFancybox() {
    $.fancybox.defaults.btnTpl.edit = `
      <a class="fancybox-button" data-fancybox-edit title="Substituir" href="javascript:void(0)" style="text-align: center">
        <i class="fas fa-edit"></i>
      </a>
    `;
    $.fancybox.defaults.buttons = ['download', 'edit'];
  }
}
