import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Usuario } from '../contexts/Usuario';
import { Button } from 'reactstrap';

const InfoUsuario = () => {
    const [usuario, setUsuario] = useState(sessionStorage.getItem("usuario") ? JSON.parse(sessionStorage.getItem("usuario")) : "");
    const { setAuth } = useContext(Usuario);
    const nav = useNavigate();

    const sair = () => {
        setAuth(false)
        sessionStorage.setItem("usuario", "");
        nav("/");
    }

    return (
        <>
            {/* <img src={usuario.img} alt="" />
                    <p>{usuario.nome} - {usuario.email}</p> */}
            <Button onClick={sair}>SAIR</Button>
        </>
    )
}

export default InfoUsuario