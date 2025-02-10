import React, { useContext, useState } from 'react'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import styles from "../stylos.module.css"
import axios from 'axios';
import { Usuario } from '../contexts/Usuario';
import { useNavigate } from 'react-router-dom';

const Cadastrar = ({ inputs = {}, pegarDadosCarregar = () => { }, url, textoBotao, tipoFormulario = "" }) => {
    const [formulario, setFormulario] = useState(inputs);
    const [erro, setErro] = useState({});
    const [msg, setMsg] = useState("");
    const [desabilitar, setDesabilitar] = useState(false);
    const [textoBotaoCarregando, setTextoBotaoCarregando] = useState(textoBotao);
    const { setAuth } = useContext(Usuario);
    const nav = useNavigate();

    const changeInputs = (e) => {
        const { name, value } = e.target;

        setFormulario({
            ...formulario, [name]: value
        });
    }

    const enviar = (e) => {
        e.preventDefault();

        const msgerros = {};

        setErro(msgerros);
        setDesabilitar(true);
        setTextoBotaoCarregando("CAREGANDO...")

        axios.post(`http://localhost:1999/${url}`, formulario, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
            for (const [key, value] of Object.entries(formulario)) {
                // if (value.length == 0) {
                //     msgerros[key] = "Campo obrigatório";
                // }

                if (value.length > 10 && key == "idade") {
                    msgerros[key] = `O campo ${key} dever ter no maximo 10 caracteres`;
                }

                if (value.length > 255) {
                    msgerros[key] = `O campo ${key} dever ter no maximo 255 caracteres`;
                }

                if (res.data.campo) {
                    msgerros[res.data.campo] = res.data.msg;
                }

                if (res.data.campo == "email") {
                    msgerros["email"] = res.data.msg;
                }

                if (tipoFormulario == "login") {
                    // console.log(res.data);

                    if (res.data.erro) {
                        setAuth(false);
                    } else {
                        setAuth(true);
                        sessionStorage.setItem("usuario", JSON.stringify(res.data));
                    }
                }

                if (tipoFormulario == "cadastrar") {
                    if (!res.data.erro) {
                        nav("/");
                    }
                }

                setErro(msgerros);

                if (res.data.erro) {
                    setMsg(!res.data.campo ? res.data.msg : "");
                    setDesabilitar(false);
                    setTextoBotaoCarregando(textoBotaoCarregando)
                }


                setErro(msgerros);
            }

            if (!res.data.erro) {
                pegarDadosCarregar();
                setMsg("");
                setDesabilitar(false);
                setTextoBotaoCarregando(textoBotaoCarregando)
            }
        }).catch((err) => {
            if (err) {
                setModal(true);
            }
            setDesabilitar(false)
            setTextoBotaoCarregando(textoBotaoCarregando)
            setMsg("Erro interno no servidor. Por favor contate o suporte");
        })
    }

    const tipoPlaceholder = (tipo) => {

        if (tipo == "nome") {
            return "Informe o nome";
        }

        if (tipo == "email") {
            return "Informe o e-mail";
        }

        if (tipo == "senha") {
            return "Informe a senha";
        }

        if (tipo == "idade") {
            return "Informe a Idade";
        }
    }

    const tipoInput = (tipo) => {
        if (tipo == "senha") {
            return "password";
        }

        if (tipo == "email") {
            return "email";
        }
    }

    return (
        <div>
            <form onSubmit={enviar}>
                <FormGroup>
                    {formulario ? Object.keys(formulario).map((valor, index) => {
                        return (
                            <div key={index}>
                                <div className="">
                                    <Label htmlFor={valor} className={styles.labels}>{valor}</Label>
                                    <Input type={tipoInput(valor)} placeholder={tipoPlaceholder(valor)} disabled={desabilitar} name={valor} onChange={changeInputs} />
                                    <p className={styles.erro}>{erro[valor]}</p>
                                </div>
                            </div>
                        )
                    }) : ""}
                </FormGroup>
                <span className={styles.erro}>{msg}</span>
                <div className="d-flex gap-2 justify-content-end">
                    <Button color="success" disabled={desabilitar}>{textoBotaoCarregando}</Button>
                </div>
            </form>
        </div>
    )
}

export default Cadastrar
