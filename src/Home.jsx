import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'reactstrap';
import Cadastrar from './crud/Cadastrar';
import { Usuario } from './contexts/Usuario';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const [usuario, setUsuario] = useState(sessionStorage.getItem("usuario") ? JSON.parse(sessionStorage.getItem("usuario")) : "");
    const { setAuth } = useContext(Usuario);
    const nav = useNavigate();

    const sair = () => {
        setAuth(false)
        sessionStorage.setItem("usuario", "");
    }


    const inputs = {
        nome: "",
        img: "",
        descricao: "",
        estado_civil: "",
        telefone: "",
        data_nascimento: "",
        empresa: "",
        cargo: "",
        responsabilidades: "",
        habilidades: "",
        data_inicio: "",
        data_fim: "",
        usuario_id: usuario.id,
    }

    return (
        <>
            <Button onClick={sair}>SAIR</Button>
            <Button onClick={() => nav("/curriculos")} color="primary">VER CURRICULOS</Button>

            <p>{usuario.nome} - {usuario.email}</p>
            <Cadastrar textoBotao={"CADASTRAR"} url={"cadastrar/curriculo"} inputs={inputs} tipoFormulario="curriculo" />
        </>
    )
}

export default Home
