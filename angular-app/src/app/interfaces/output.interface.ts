import { ProductInterface } from './product.interface';

export interface OutputInterface {
    id?: number;
    amount: number;
    product?: ProductInterface;
    readonly created_at?: { date: string };
    readonly updated_at?: { date: string };
}
