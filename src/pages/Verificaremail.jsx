import React from 'react'
import { Button, Container } from 'reactstrap'
import Cadastrar from '../crud/Cadastrar'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const Verificaremail = () => {
    const nav = useNavigate();

    return (
        <>
            <Button color="transparent" onClick={() => nav("/")}>
                <FaArrowLeft fontSize={45} className="m-2" />
            </Button>
            <Container>
                <Cadastrar textoBotao={"VERIFICAR"} url={"verificaremail"} inputs={{ emailVerificar: "" }} tipoFormulario={"verificarEmail"} />
            </Container>
        </>
    )
}

export default Verificaremail
