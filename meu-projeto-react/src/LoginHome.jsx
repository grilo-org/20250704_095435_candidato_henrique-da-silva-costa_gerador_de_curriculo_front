import React, { useContext } from 'react'
import { Usuario } from './contexts/Usuario';
import { Container } from 'reactstrap';
import Cadastrar from './crud/Cadastrar';

const LoginHome = () => {
    const { setAuth } = useContext(Usuario);

    const inputs = {
        nome: "",
        email: "",
        senha: "",
    };

    return (
        <Container>
            <Cadastrar inputs={inputs} />
        </Container>
    )
}

export default LoginHome