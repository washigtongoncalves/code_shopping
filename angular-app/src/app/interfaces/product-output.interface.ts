import { ProductInterface } from './product.interface';
import { OutputInterface } from './output.interface';

export interface ProductOutputInterface {
    product: ProductInterface;
    outputs: Array<OutputInterface>;
}
