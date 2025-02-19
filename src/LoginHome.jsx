import React, { useContext } from 'react'
import { Usuario } from './contexts/Usuario';
import { Button, Container } from 'reactstrap';
import Cadastrar from './crud/Cadastrar';
import { useNavigate } from 'react-router-dom';

const LoginHome = () => {
    const nav = useNavigate();

    const inputs = {
        email: "",
        senha: "",
    };

    return (
        <Container>
            <Cadastrar inputs={inputs} url={"login"} textoBotao={"LOGIN"} tipoFormulario={"login"} />
            <Button onClick={() => nav("/cadastrar")}>cadastre-se</Button>
            <Button onClick={() => nav("/verificaremail")}>recuperar senha</Button>
        </Container>
    )
}

export default LoginHome