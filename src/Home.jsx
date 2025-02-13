import axios from 'axios';
import React, { useState } from 'react'
import { Button } from 'reactstrap';
import Cadastrar from './crud/Cadastrar';
const Home = () => {
    const [usuario, setUsuario] = useState(sessionStorage.getItem("usuario") ? JSON.parse(sessionStorage.getItem("usuario")) : "");

    const inputs = {
        nome: "",
        descricao: "",
        estadoCivil: "",
        telefone: "",
        dataNascimento: "",
        empresa: "",
        cargo: "",
        responsabilidades: "",
        dataInicio: "",
        dataFim: "",
    }

    return (
        <>
            <p>{usuario.nome} - {usuario.email}</p>
            <Cadastrar textoBotao={"CADASTRAR"} url={""} inputs={inputs} />
        </>
    )
}

export default Home
