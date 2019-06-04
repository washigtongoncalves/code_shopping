import { FieldsOptionsInterface } from '../../../../interfaces/fields-options.interface';

const fieldsOptions: FieldsOptionsInterface = {
    product: {
        id: 'product',
        label: 'Produto'
    },
    amount: {
        id: 'amount',
        label: 'QTD',
        min: 1,
        step: 1
    },
};

export default fieldsOptions;