import React, { useEffect } from 'react'
import Cadastrar from '../crud/Cadastrar'
import axios from 'axios';
import { Button, Container } from 'reactstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RecuperarSenha = () => {
    const nav = useNavigate();

    const inputs = {
        senha: "",
        novaSenha: "",
        confirmaSenha: "",
        emailVerificar: JSON.parse(localStorage.getItem("emailVerificar")),
    }

    return (
        <>
            <Button color="transparent" onClick={() => nav("/verificaremail")}>
                <FaArrowLeft fontSize={45} className="m-2" />
            </Button>
            <Container>
                <Cadastrar url={"recuperarsenha"} textoBotao={"RECUPERAR SENHA"} inputs={inputs} tipoFormulario={"recuperarSenha"} />
            </Container>
        </>

    )
}

export default RecuperarSenha