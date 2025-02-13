import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'reactstrap';
import Cadastrar from './crud/Cadastrar';
const Home = () => {
    const [usuario, setUsuario] = useState(sessionStorage.getItem("usuario") ? JSON.parse(sessionStorage.getItem("usuario")) : "");

    const sair = () => {
        setAuth(false)
        sessionStorage.setItem("usuario", "");
    }

    const inputs = {
        nome: "",
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
            <button onClick={sair}>SAIR</button>


            <p>{usuario.nome} - {usuario.email}</p>
            <Cadastrar textoBotao={"CADASTRAR"} url={"cadastrar/curriculo"} inputs={inputs} tipoFormulario="curriculo" />
        </>
    )
}

export default Home
