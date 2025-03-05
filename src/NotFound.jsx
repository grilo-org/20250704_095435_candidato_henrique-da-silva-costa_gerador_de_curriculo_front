import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container } from 'reactstrap';

const NotFound = () => {
    const nav = useNavigate();

    return (
        <>
            <Button color="success" onClick={() => nav("/")}>CADASTRAR CURRÍCULO</Button>
            <Container>
                <div><h1 className="text-center">Pagiana não encontrada</h1></div>
            </Container>
        </>
    )
}

export default NotFound