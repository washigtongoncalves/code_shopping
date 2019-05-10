export interface FieldsOptionsInterface {
    [field: string]: {
        id: string,
        label: string,
        placeholder?: string,
        step?: number,
        min?: number,
        max?: number,
        maxlength?: number,
        validationMessage?: {
            [error: string]: any
        }
    };
}
