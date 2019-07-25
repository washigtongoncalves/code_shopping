import { ProductInterface } from './product.interface';
import { PhotosInterface } from './photos.interface';

export interface ProductPhotosInterface {
    product: ProductInterface;
    photos: PhotosInterface[];
}
