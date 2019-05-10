import { FieldsOptionsInterface } from '../../../../interfaces/fields-options.interface';

const fieldsOptions: FieldsOptionsInterface = {
    name: {
      id: 'name',
      label: 'Nome',
      placeholder: 'Informe um nome para o produto',
      validationMessage: {
        maxlength: 60
      }
    },
    description: {
      id: 'description',
      label: 'Descrição',
      placeholder: 'Informe uma descrição para o produto'
    },
    price: {
      id: 'price',
      label: 'Preço',
      min: 0,
      step: 0.01
    },
    active: {
      id: 'active',
      label: 'Ativo'
    }
};

export default fieldsOptions;
