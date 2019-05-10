import { FieldsOptionsInterface } from '../../../../interfaces/fields-options.interface';

const fieldsOptions: FieldsOptionsInterface = {
    name: {
      id: 'name',
      label: 'Nome',
      placeholder: 'Informe um nome para a categoria',
      validationMessage: {
        maxlength: 30
      }
    },
    active: {
      id: 'active',
      label: 'Ativo'
    }
};

export default fieldsOptions;
