import React, { useContext, useState } from 'react'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import styles from "../stylos.module.css"
import axios from 'axios';
import { Usuario } from '../contexts/Usuario';
import { useNavigate } from 'react-router-dom';
import { colunas, tipoInput, tipoLabel, tipoPlaceholder } from './funcoesFormularios';

const Formulario = ({ inputs = {}, pegarDadosCarregar = () => { }, url, textoBotao, tipoFormulario = "", botaoCor = "success" }) => {
    const [formulario, setFormulario] = useState(inputs);
    const [erro, setErro] = useState({});
    const [msg, setMsg] = useState("");
    const [desabilitar, setDesabilitar] = useState(false);
    const [textoBotaoCarregando, setTextoBotaoCarregando] = useState(textoBotao);
    const { setAuth } = useContext(Usuario);
    const nav = useNavigate();

    const changeInputs = (e) => {
        const { name, value, files } = e.target;

        setFormulario({
            ...formulario, [name]: name === "img" ? files[0] : value
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
                if (value != null && value.length == 0 && key != "img") {
                    msgerros[key] = "Campo obrigatório";
                }

                if (value != null && value.length > 10 && key == "idade") {
                    msgerros[key] = `O campo ${key} dever ter no maximo 10 caracteres`;
                }

                if (value != null && value.length > 255) {
                    msgerros[key] = `O campo ${key} dever ter no maximo 255 caracteres`;
                }

                if (res.data.campo) {
                    msgerros[res.data.campo] = res.data.msg;
                }

                if (res.data.campo == "email") {
                    msgerros["email"] = res.data.msg;
                }

                if (tipoFormulario == "login") {
                    if (res.data.erro) {
                        setAuth(false);
                    } else {
                        setAuth(true);
                        sessionStorage.setItem("usuario", JSON.stringify(res.data));
                    }
                }

                if (tipoFormulario == "cadastrarUsuario") {
                    if (!res.data.erro) {
                        nav("/");
                    }
                }

                if (tipoFormulario == "curriculo") {
                    if (!res.data.erro) {
                        localStorage.setItem("curriculo", JSON.stringify(formulario));
                        window.open('/pdf', '_blank');
                    }
                }

                if (tipoFormulario == "verificarEmail") {
                    if (!res.data.erro) {
                        localStorage.setItem("emailVerificar", JSON.stringify(formulario.emailVerificar));
                        nav("/recuperarsenha")
                    } else {
                        localStorage.setItem("emailVerificar", "");
                    }
                }

                if (tipoFormulario == "recuperarSenha") {
                    if (!res.data.erro) {
                        localStorage.setItem("emailVerificar", "");
                        nav("/")
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
                console.log(err);
            }
            setDesabilitar(false)
            setTextoBotaoCarregando(textoBotaoCarregando)
            setMsg("Erro interno no servidor. Por favor contate o suporte");
        })
    }

    return (
        <div>
            <form onSubmit={enviar}>
                <FormGroup>
                    <div className="row">
                        {formulario ? Object.keys(formulario).map((valor, index) => {
                            return (
                                <div key={index} className={colunas(valor, tipoFormulario)}>
                                    <Label htmlFor={valor} className={styles.labels}><strong>{tipoLabel(valor, tipoFormulario)}</strong></Label>
                                    <Input type={tipoInput(valor, tipoFormulario)} placeholder={tipoPlaceholder(valor)} disabled={desabilitar} name={valor} onChange={changeInputs} />
                                    <p className={styles.erro}>{erro[valor]}</p>
                                </div>
                            )
                        }) : ""}
                    </div>
                </FormGroup>
                <span className={styles.erro}>{msg}</span>
                <div className="d-flex gap-2 justify-content-end">
                    <Button color={botaoCor} disabled={desabilitar}>{textoBotaoCarregando}</Button>
                </div>
            </form>
        </div>
    )
}

export default Formulario
