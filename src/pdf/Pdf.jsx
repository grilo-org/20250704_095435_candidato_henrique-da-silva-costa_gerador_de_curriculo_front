import React, { useState } from 'react';
import { PDFViewer, Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { Usuario } from '../contexts/Usuario';

const Pdf = () => {
    const [dados, setDados] = useState(localStorage.getItem("curriculo") ? JSON.parse(localStorage.getItem("curriculo")) : {});

    const [linkImagem] = useState(Usuario.img);

    const styles = StyleSheet.create({
        body: {
            padding: 20,
            fontFamily: 'Helvetica',
        },
        fs24: {
            fontSize: 24,
        },
        fs16: {
            fontSize: 16,
        },
        fs12: {
            fontSize: 12,
        },
        imagem: {
            maxWidth: "100%",
        },
        titulo: {
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: 8,
        },
        imagemDiv: {
            width: "40%",
        },
        descricao: {
            width: "100%",
        },
        conteudo: {
            flexDirection: "row",
            marginBottom: 8,
        },
        experiencias: {
            width: "60%",
        },
        sobre: {
            width: "40%",
        },
    });

    const MyDocument = () => (
        <Document>
            <Page style={styles.body}>
                <View style={styles.titulo}>
                    <View style={styles.imagemDiv}>
                        <Image style={styles.imagem} source={{ uri: "" }} />
                        {/* <Image style={styles.imagem} source={{ uri: linkImagem }} /> */}
                        {/* <Image style={styles.imagem} src={{
                            uri: "https://henriquedeveloper.com.br/uploads/430489515_3067802433356441_2601196663833141402_n.jpg",
                            headers: {
                                "Cache-Control": "no-cache"
                            },
                            body: ""
                        }} /> */}
                    </View>
                    <View style={styles.descricao}>
                        <Text style={styles.fs24}>{dados.nome}</Text>
                        <Text style={styles.fs12}>{dados.descricao}</Text>
                    </View>
                </View>
                <View style={styles.conteudo}>
                    <View style={styles.sobre}>
                        <Text style={styles.fs24}>Dados pessoais</Text>
                        <View>
                            <Text style={styles.fs16}>Informações de contato</Text>
                            <Text style={styles.fs12}>Estado civil: {dados.estado_civil}</Text>
                            <Text style={styles.fs12}>Telefone: {dados.telefone}</Text>
                            <Text style={styles.fs12}>Data de nascimento: {dados.data_nascimento}</Text>
                        </View>
                        <View>
                            <Text style={styles.fs16}>Habilidades</Text>
                            <Text style={styles.fs12}>{dados.habilidades}</Text>
                        </View>
                    </View>
                    <View style={styles.experiencias}>
                        <Text style={styles.fs24}>Experiências</Text>
                        <View>
                            <Text style={styles.fs16}>Empresa: {dados.empresa}</Text>
                            <Text style={styles.fs16}>Cargo: {dados.cargo}</Text>
                            <Text style={styles.fs16}>Responsabilidades</Text>
                            <Text style={styles.fs12}>{dados.Responsabilidades}</Text>
                            <View>
                                <Text style={styles.fs16}>Período</Text>
                                <Text style={styles.fs12}>de {dados.data_inicio} a {dados.data_fim}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );

    return (
        <div style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "100%"
        }}>
            <PDFViewer width={"100%"} height={"100%"}>
                <MyDocument />
            </PDFViewer>
        </div>
    );
};

export default Pdf;