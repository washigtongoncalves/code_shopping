const messages = {
    required  : ':name é requerido',
    minlength : ':name precisa ter no mínimo :minlength caracteres',
    maxlength : ':name precisa ter no máximo :maxlength caracteres',
    email     : ':name não é um e-mail válido',
    min       : ':name deve começar de :min'
};

export class ValidationMessage {
    static getMessage(error: string, replaceTokens: Array<string>): string {
        let message  = messages[error];
        const tokens = message.match(/\:[a-z]*/g);
        tokens.forEach((token, index) => message = message.replace(token, replaceTokens[index]));
        return message;
    }
}
