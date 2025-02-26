import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styles from "../stylos.module.css"

const Excluir = ({ id = null, nome = "", pegarDadosCarregar = () => { }, url = "", tamanhoBotao = "" }) => {
    const [modal, setModal] = useState(false);
    const [msg, setMsg] = useState("");

    const toggle = () => setModal(!modal);

    const deletar = () => {
        axios.options(`http://localhost:1999/${url}`, { params: { id: id } }, {
            headers: {
                "content-type": "application/json"
            }
        }).then((res) => {

            if (res.data.erro) {
                setModal(true);
                setMsg(res.data.msg);
                return;
            }

            setModal(false)
            pegarDadosCarregar();
        }).catch((err) => {
            setMsg("Erro interno no servidor, contate o suporte");
        })
    }

    return (
        <div>
            <Button color="danger" className={styles.fonteBotao12} size={tamanhoBotao} onClick={toggle}>
                EXCLUIR
            </Button>
            <Modal backdrop={modal ? "static" : true} isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>EXCLUIR</ModalHeader>
                <ModalBody>
                    <h4>Deseja exluir {nome.slice(0, 20) + "..."} </h4>
                    <p className={styles.erro}>{msg}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setModal(false)}>
                        CANCELAR
                    </Button>
                    <Button color="danger" onClick={deletar}>
                        EXCLUIR
                    </Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Excluir
