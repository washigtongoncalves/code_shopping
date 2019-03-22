export interface UserInterface {
    id?: number;
    name: string;
    readonly email: string;
    password?: string;
    readonly created_at?: { date: string }
}