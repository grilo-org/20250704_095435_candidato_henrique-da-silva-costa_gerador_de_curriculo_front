import React from 'react'
import { Button, Container } from 'reactstrap'
import Cadastrar from './crud/Cadastrar'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Cadastro = () => {
    const nav = useNavigate();

    const inputs = {
        nome: "",
        email: "",
        senha: ""
    }

    return (
        <>
            <Button color="transparent" onClick={() => nav("/")}>
                <FaArrowLeft fontSize={45} className="m-2" />
            </Button>
            <Container>
                <Cadastrar inputs={inputs} url={"cadastrar"} textoBotao={"CADASTRAR"} tipoFormulario={"cadastrar"} />
            </Container>
        </>
    )
}

export default Cadastro
