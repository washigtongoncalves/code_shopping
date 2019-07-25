import { ProductInterface } from './product.interface';

export interface PhotosInterface {
    id?: number;
    photo_url: string;
    product?: ProductInterface;
    readonly created_at?: {
        date: string
    };
    readonly updated_at?: {
        date: string
    };
}
