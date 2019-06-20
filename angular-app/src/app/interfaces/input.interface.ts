import { ProductInterface } from './product.interface';

export interface InputInterface {
    id?: number;
    amount: number;
    product?: ProductInterface;
    readonly created_at?: { date: string };
    readonly updated_at?: { date: string };
}
