export interface ProductInterface
{
    id?: number;
    name: string;
    description?: string;
    readonly slug?: string;
    readonly stock?: number;
    price?: number;
    active?: boolean;
    readonly created_at?: {
        date: string
    },
    readonly updated_at?: {
        date: string
    }
}