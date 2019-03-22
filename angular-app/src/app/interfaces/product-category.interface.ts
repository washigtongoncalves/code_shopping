import { ProductInterface } from './product.interface';
import { CategoryInterface } from './category.interface';

export interface ProductCategoryInterface {
    product: ProductInterface;
    categories: Array<CategoryInterface>;
}
