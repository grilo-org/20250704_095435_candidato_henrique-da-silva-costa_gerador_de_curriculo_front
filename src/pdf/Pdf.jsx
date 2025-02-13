import React, { useState } from 'react'
import { Document, Page, Text, View, StyleSheet, Image, PDFViewer } from "@react-pdf/renderer";
import img from "../assets/img.png"

const Pdf = () => {
    const [dados, setdados] = useState(localStorage.getItem("curriculo") ? JSON.parse(localStorage.getItem("curriculo")) : "");

    const styles = StyleSheet.create({
        body: {
            padding: 20,
            fontFamily: 'Helvetica',
        },

        fs24: {
            fontSize: 24,
        },

        fs16: {
            fontSize: 16
        },

        fs12: {
            fontSize: 12,
        },

        imagem: {
            maxWidth: "100%"
        },

        titulo: {
            flexDirection: "column",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "8px"
        },
        imagemDiv: {
            width: "40%"
        },

        descricao: {
            width: "100%",
        },

        conteudo: {
            flexDirection: "row",
            gap: "1rem",
        },
        experiencias: {
            width: "60%",
            gap: "3px"
        },
        sobre: {
            width: "40%",
            gap: "5px"
        },
    });

    const MyDocument = () => (
        <Document>
            <Page style={styles.body}>
                <View style={styles.titulo}>
                    <View style={styles.imagemDiv}>
                        <Image style={styles.imagem} src={img}></Image>
                    </View>
                    <View style={styles.descricao}>
                        <Text style={styles.fs24}>{dados.nome}</Text>
                        <Text style={styles.fs12}>{dados.descricao}</Text>
                    </View>
                </View>
                <View style={styles.conteudo} >
                    <View style={styles.sobre}>
                        <Text style={styles.fs24}>Dados pessoais</Text>
                        <View>
                            <Text style={styles.fs16}>Informações de contato</Text>
                            <Text style={styles.fs12}>Estado civil: <Text style={styles.fs12}>{dados.estado_civil}</Text>
                            </Text>
                            <Text style={styles.fs12}>Telefone: <Text style={styles.fs12}>{dados.telefone}</Text>
                            </Text>
                            <Text style={styles.fs12}>Data de nascimento: <Text style={styles.fs12}>{dados.data_nascimento}</Text>
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.fs16}>Hábilidades</Text>
                            <Text style={styles.fs12}>{dados.habilidades}</Text>
                        </View>
                    </View>
                    <View style={styles.experiencias}>
                        <Text style={styles.fs24}>Experiências</Text>
                        <View>
                            <Text style={styles.fs16}>Empresa:<Text style={styles.fs12}>{dados.empresa}</Text></Text>
                            <Text style={styles.fs16}>Cargo:<Text style={styles.fs12}>{dados.cargo}</Text></Text>
                            <Text style={styles.fs16}>Responsabilidades</Text>
                            <Text style={styles.fs12}>{dados.Responsabilidades}</Text>
                            <View>
                                <Text style={styles.fs16}>Periodo</Text>
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
    )
}

export default Pdf
