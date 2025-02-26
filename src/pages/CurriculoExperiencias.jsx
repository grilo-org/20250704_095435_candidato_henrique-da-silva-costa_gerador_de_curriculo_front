import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Button, Container, Table } from 'reactstrap';
import moment from 'moment';
import styles from "../stylos.module.css";
import Carregando from '../components/Carregando';
import Editar from '../crud/Editar';
import Excluir from '../crud/Excluir';

const CurriculoExperiencias = () => {
    const [dados, setDados] = useState([]);
    const [msg, setMsg] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [botaoDesabilitado, setBotaoDesabilitado] = useState(false);
    const [removerLoading, setRemoverLoading] = useState(false);
    const nav = useNavigate();
    const curriculoId = JSON.parse(localStorage.getItem("curriculoId"));

    const inputs = {
        data_inicio: "",
        data_fim: "",
        empresa: "",
        habilidades: "",
        cargo: "",
        descricao: "",
        responsabilidades: "",
        curriculo_id: curriculoId,
    }

    const pegarDados = (page) => {
        setBotaoDesabilitado(true)
        axios.get(`http://localhost:1999/experiencias/${curriculoId}`, {
            params: {
                "id": sessionStorage.getItem("usuarioId"),
                "pagina": page
            }
        }).then((res) => {
            setDados(res.data.dados);
            setPaginaAtual(res.data.paginaAtual);
            setTotalPages(res.data.totalPaginas);
            setBotaoDesabilitado(false);
            setRemoverLoading(true);
        }).catch((err) => {
            setMsg("erro interno servidor, entre em  contato com o suporte");
            setBotaoDesabilitado(false);
        });
    }

    useEffect(() => {
        setTimeout(() => {
            pegarDados(paginaAtual);
        }, 1000);
    }, [paginaAtual]);

    const paginar = (page) => {
        setBotaoDesabilitado(true);
        if (page >= 1 && page <= totalPages) {
            setPaginaAtual(page);
        }
    };

    return (
        <>
            <Button color="transparent" onClick={() => nav("/")}><FaArrowLeft size={40} /></Button>
            <Container>
                <h1>Curriculos</h1>

                {dados.length > 0 ?
                    <Table responsive striped size="sm">
                        <thead>
                            <tr>
                                <th>Empresa</th>
                                <th>Data inicial</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <>
                                {dados.length > 0 ? dados.map((dado, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{dado.empresa ? dado.empresa.slice(0, 30) + "..." : "não informado"}</td>
                                            <td>{moment(dado.data_inicio).format("DD/MM/YYYY")}</td>
                                            <td>{moment(dado.data_fim).format("DD/MM/YYYY")}</td>
                                            <td className="d-flex gap-2 justify-content-end">
                                                <Button className={styles.fonteBotao12} size="sm" color="primary">VER EXPERIENCIA</Button>
                                                <Editar urlGetLista="experiencias" tamanhoBotao={"sm"} urlGet={`http://localhost:1999/experiencia/${dado.id}`} inputs={inputs} url={"editar/experiencia"} tipoFormulario={"editar"} pegarDadosCarregar={pegarDados} />
                                                <Excluir tamanhoBotao={"sm"} url={"excluirexperiencia"} id={dado.id} pegarDadosCarregar={pegarDados} />
                                            </td>
                                        </tr>
                                    )
                                }) : ""}
                            </>
                        </tbody>
                    </Table>
                    : ""}

                {msg ? <p className={styles.erro}>{msg}</p> : ""}
                {!removerLoading ? <Carregando /> : dados.length > 0 ? "" : <h2 className="text-center">SEM INFORMAÇÕES</h2>}

                {dados.length > 0 ?
                    <>
                        <div className="d-flex gap-2 justify-content-center">
                            <Button
                                color="primary"
                                onClick={() => paginar(paginaAtual - 1)}
                                disabled={paginaAtual === 1 ? paginaAtual : botaoDesabilitado}
                            >
                                Anterior
                            </Button>
                            {[...Array(totalPages)].map((_, index) => (
                                <Button
                                    color="primary"
                                    disabled={index == paginaAtual - 1 ? true : botaoDesabilitado}
                                    key={index + 1}
                                    onClick={() => paginar(index + 1)}
                                    className={paginaAtual === index + 1 ? "active" : ""}
                                >
                                    {index + 1}
                                </Button>
                            ))}
                            <Button
                                color="primary"
                                onClick={() => paginar(paginaAtual + 1)}
                                disabled={paginaAtual === totalPages ? paginaAtual : botaoDesabilitado}
                            >
                                Próximo
                            </Button>
                        </div>
                        {botaoDesabilitado ? <Carregando /> : ""}
                    </>
                    : ""}

            </Container>
        </>
    )
}

export default CurriculoExperiencias