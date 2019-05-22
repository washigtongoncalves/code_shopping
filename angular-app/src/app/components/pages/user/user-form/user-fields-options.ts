import { FieldsOptionsInterface } from '../../../../interfaces/fields-options.interface';

const fieldsOptions: FieldsOptionsInterface = {
    name: {
      id: 'name',
      label: 'Nome',
      placeholder: 'Informe um nome para o usuário',
      validationMessage: {
        maxlength: 30
      }
    },
    email: {
      id: 'email',
      label: 'E-mail',
      placeholder: 'Informe um e-mail para o usuário'
    },
    password: {
      id: 'password',
      label: 'Senha',
      placeholder: 'Informe uma senha para o usuário'
    }
};

export default fieldsOptions;
