import React, { useEffect, useState } from 'react'
import { Button, FormGroup, Input, Label, Modal, ModalHeader, ModalBody } from 'reactstrap'
import styles from "../stylos.module.css"
import axios from 'axios';
import { colunas, tamanhoModalFull, tipoInput, tipoLabel, tipoPlaceholder } from './funcoesFormularios';

const Editar = ({ inputs = {}, pegarDadosCarregar = () => { }, id = null, url = "", tipoFormulario = "", tamanhoBotao = "" }) => {
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
                empresa: res.data.empresa,
                telefone: res.data.telefone,
                habilidades: res.data.habilidades,
                nome: res.data.nome,
                estado_civil: res.data.estado_civil,
                data_fim: res.data.data_fim,
                data_inicio: res.data.data_inicio,
                data_nascimento: res.data.data_nascimento,
                responsabilidades: res.data.responsabilidades,
                descricao: res.data.descricao,
                id: res.data.id,
                usuario_id: res.data.usuario_id,
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
                if (value != null && value.length == 0) {
                    msgerros[key] = "Campo obrigatório";
                }

                if (value != null && value.length > 10 && key == "idade") {
                    msgerros[key] = `O campo ${key} dever ter no maximo 10 caracteres`;
                }

                if (value != null && value.length > 255) {
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
            setMsg("Erro interno no servidor. Por favor contate o suporte" + err);
        })
    }

    return (
        <div>
            <Button color="success" className={styles.fonteBotao12} size={tamanhoBotao} onClick={pegarDados}>
                EDITAR
            </Button>
            <Modal backdrop={modal ? "static" : true} fullscreen={tamanhoModalFull(tipoFormulario)} isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>EDITAR</ModalHeader>
                <ModalBody>
                    <form onSubmit={enviar}>
                        <FormGroup>
                            <div className="row">
                                {formulario ? Object.keys(formulario).map((valor, index) => {
                                    return (
                                        <div key={index} className={colunas(valor, tipoFormulario)}>
                                            <Label htmlFor={valor} className={styles.labels}><strong>{tipoLabel(valor, tipoFormulario)}</strong></Label>
                                            <Input placeholder={tipoPlaceholder(valor)} disabled={desabilitar} name={valor} type={tipoInput(valor)} defaultValue={formulario[valor]} onChange={changeInputs} />
                                            <p className={styles.erro}>{erro[valor]}</p>
                                        </div>
                                    )
                                }) : ""}
                            </div>
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
