export const tipoPlaceholder = (tipo) => {
    if (tipo == "nome") {
        return "Informe o nome";
    }

    if (tipo == "email" || tipo == "emailVerificar") {
        return "Informe o e-mail";
    }

    if (tipo == "senha") {
        return "Informe a senha";
    }

    if (tipo == "novaSenha") {
        return "Informe a nova senha";
    }

    if (tipo == "confirmaSenha") {
        return "Confirme a nova senha";
    }

    if (tipo == "idade") {
        return "Informe a Idade";
    }

    if (tipo == "estado_civil") {
        return "Informe o estado civil";
    }

    if (tipo == "telefone") {
        return "Informe seu telefone";
    }

    if (tipo == "data_nascimento") {
        return "Informe sua data de nascimento";
    }

    if (tipo == "data_inicio") {
        return "Informe a data de iníco";
    }

    if (tipo == "data_fim") {
        return "Informe a data final";
    }

    if (tipo == "empresa") {
        return "Informe a empresa";
    }

    if (tipo == "habilidades") {
        return "Informe as habilidades";
    }

    if (tipo == "cargo") {
        return "Informe seu cargo";
    }

    if (tipo == "descricao") {
        return "Informe a descrição";
    }

    if (tipo == "responsabilidades") {
        return "Informe suas responsabilidades";
    }

}

export const tipoLabel = (tipo, tipoFormulario) => {
    if (tipo === "usuario_id") {
        return "";
    }

    if (tipo == "data_nascimento") {
        return "data de nascimento";
    }

    if (tipo == "data_inicio") {
        return "data de iníco";
    }

    if (tipo == "data_fim") {
        return "data final";
    }

    if (tipo == "data_nascimento") {
        return "Informe seu telefone";
    }

    if (tipo == "data_inicio") {
        return "Informe seu telefone";
    }

    if (tipo == "data_fim") {
        return "Informe seu telefone";
    }

    if (tipo == "estado_civil") {
        return "estado civil";
    }

    if (tipo == "descricao") {
        return "descrição";
    }

    if (tipo == "id") {
        return "";
    }

    if (tipoFormulario == "recuperarSenha" && tipo == "emailVerificar") {
        return "";
    }

    if (tipo == "email" || tipo == "emailVerificar") {
        return "e-mail";
    }

    return tipo;
}

export const tipoInput = (tipo, tipoFormulario) => {
    const tipoData = ["data_inicio", "data_fim", "data_nascimento"];

    if (tipoData.includes(tipo)) {
        return "date";
    }

    if (tipoFormulario == "recuperarSenha" && tipo == "emailVerificar") {
        return "hidden";
    }

    if (tipo == "usuario_id") {
        return "hidden";
    }

    if (tipo == "id") {
        return "hidden";
    }

    if (tipo == "senha") {
        return "password";
    }

    if (tipo == "email") {
        return "email";
    }

    if (tipo == "img") {
        return "file";
    }

    if (tipo === "descricao" || tipo === "responsabilidades") {
        return "textarea";
    }
}

export const colunas = (tipo, tipoFormulario) => {

    if (tipoFormulario == "curriculo") {
        let col3 = ["nome", "img", "telefone", "estado_civil", "data_nascimento", "empresa", "data_inicio", "data_fim"];
        let col6 = ["habilidades", "cargo", "descricao", "responsabilidades"];

        if (col6.includes(tipo)) {
            return "col-md-6";
        }

        if (col3.includes(tipo)) {
            return "col-md-3";
        }
    }

    if (tipoFormulario == "editar") {
        let col6 = ["responsabilidades", "descricao"];
        let col3 = ["data_nascimento", "data_inicio", "data_fim", "estado_civil"];
        let col4 = ["habilidades", "cargo", "empresa", "img", "nome", "telefone"];


        if (col3.includes(tipo)) {
            return "col-md-3";
        }

        if (col4.includes(tipo)) {
            return "col-md-4";
        }

        if (col6.includes(tipo)) {
            return "col-md-6";
        }
    }
}

export const tamanhoModalFull = (tipoFormulario) => {
    if (tipoFormulario == "editar") {
        return true;
    }
}