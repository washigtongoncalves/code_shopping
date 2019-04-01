export interface UserInterface {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    readonly created_at?: { date: string };
}
