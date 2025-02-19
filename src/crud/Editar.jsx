import React, { useEffect, useState } from 'react'
import { Button, FormGroup, Input, Label, Modal, ModalHeader, ModalBody } from 'reactstrap'
import styles from "../stylos.module.css"
import axios from 'axios';

const Editar = ({ inputs = {}, pegarDadosCarregar = () => { }, id = null, url = "" }) => {
    const [formulario, setFormulario] = useState(inputs);
    const [erro, setErro] = useState({});
    const [msg, setMsg] = useState("");
    const [desabilitar, setDesabilitar] = useState(false);
    const [textoBotaoCarregando, setTextoBotaoCarregando] = useState("EDITAR");
    const [modal, setModal] = useState(false);


    const pegarDados = () => {

        setModal(!modal)
        setMsg("")
        setErro({})
        setFormulario(inputs);

        axios.get(`http://localhost:1999/curriculoid/${id}`).then((res) => {
            let ordenado = {
                cargo: res.data.cargo,
                img: res.data.img,
                data_fim: res.data.data_fim,
                data_inicio: res.data.data_inicio,
                data_nascimento: res.data.data_nascimento,
                descricao: res.data.descricao,
                empresa: res.data.empresa,
                estado_civil: res.data.estado_civil,
                habilidades: res.data.habilidades,
                id: res.data.id,
                nome: res.data.nome,
                responsabilidades: res.data.responsabilidades,
                telefone: res.data.telefone,
                usuario_id: res.data.usuario_id
            }

            setFormulario(ordenado);
        }).catch((err) => {
            alert("Erro interno no servidor");
        });
    }

    const toggle = () => {
        setModal(!modal)
    }

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
                if (value.length == 0) {
                    msgerros[key] = "Campo obrigatório" + key;
                }

                if (value.length > 10 && key == "idade") {
                    msgerros[key] = `O campo ${key} dever ter no maximo 10 caracteres`;
                }

                if (value.length > 255) {
                    msgerros[key] = `O campo ${key} dever ter no maximo 255 caracteres`;
                }

                setErro(msgerros);

                if (res.data.erro) {
                    setModal(true);
                    setMsg(res.data.msg);
                    setDesabilitar(false);
                    setTextoBotaoCarregando("EDITAR")
                }

                setErro(msgerros);
            }


            if (!res.data.erro) {
                pegarDadosCarregar();
                setMsg("");
                setModal(false)
                setDesabilitar(false);
                setTextoBotaoCarregando("EDITAR")
            }
        }).catch((err) => {
            if (err) {
                setModal(true);
            }
            setDesabilitar(false)
            setTextoBotaoCarregando("EDITAR")
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

    const tipoLabel = (tipo) => {
        if (tipo === "usuario_id") {
            return "";
        }

        if (tipo === "id") {
            return "";
        }

        return tipo;
    }

    const tipoInput = (tipo) => {
        const tipoData = ["data_inicio", "data_fim", "data_nascimento"];

        if (tipoData.includes(tipo)) {
            return "date";
        }

        if (tipo == "usuario_id") {
            return "hidden";
        }

        if (tipo == "img") {
            return "file";
        }

        if (tipo == "id") {
            return "hidden";
        }

        if (tipo == "senha") {
            return "password";
        }

        if (tipo == "email") {
            return "email";
        }

        if (tipo === "descricao" || tipo === "responsabilidades") {
            return "textarea";
        }
    }

    return (
        <div>
            <Button color="success" onClick={pegarDados}>
                EDITAR
            </Button>
            <Modal backdrop={modal ? "static" : true} isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>EDITAR</ModalHeader>
                <ModalBody>
                    <form onSubmit={enviar}>
                        <FormGroup>
                            {formulario ? Object.keys(formulario).map((valor, index) => {
                                return (
                                    <div key={index}>
                                        <div className="">
                                            <Label htmlFor={valor} className={styles.labels}>{tipoLabel(valor)}</Label>
                                            <Input placeholder={tipoPlaceholder(valor)} disabled={desabilitar} name={valor} type={tipoInput(valor)} defaultValue={formulario[valor]} onChange={changeInputs} />
                                            <p className={styles.erro}>{erro[valor]}</p>
                                        </div>
                                    </div>
                                )
                            }) : ""}
                        </FormGroup>
                        <span className={styles.erro}>{msg}</span>
                        <div className="d-flex gap-2 justify-content-end">
                            <Button color="danger" disabled={desabilitar} onClick={() => setModal(false)}>FECHAR</Button>
                            <Button color="success" disabled={desabilitar}>{textoBotaoCarregando}</Button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default Editar
