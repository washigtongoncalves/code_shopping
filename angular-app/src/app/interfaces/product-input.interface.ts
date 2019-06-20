import { ProductInterface } from './product.interface';
import { InputInterface } from './input.interface';

export interface ProductInputInterface {
    product: ProductInterface;
    inputs: Array<InputInterface>;
}
