export interface MetaPaginationInterface 
{
    readonly current_page: number;
    readonly from: number;
    readonly last_page: number;
    readonly path: string;
    readonly per_page: number;
    readonly to: number;
    readonly total: number;
}