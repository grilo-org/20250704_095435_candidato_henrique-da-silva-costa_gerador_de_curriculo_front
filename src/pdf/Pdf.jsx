import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image, PDFViewer } from "@react-pdf/renderer";
import img from "../assets/img.png"

const Pdf = () => {
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
                        <Text style={styles.fs24}>Henrique da Silva costa</Text>
                        <Text style={styles.fs12}>Tenho 2 anos de experiência na área de desenvolvimento web. No primeiro ano, trabalhei com HTML, CSS e JavaScript, aprimorando minhas habilidades em front-end. No segundo ano, foquei em PHP e Laravel, adquirindo expertise em back-end. Além disso, tenho experiência com React, ampliando meu conhecimento em desenvolvimento full-stack.</Text>
                    </View>
                </View>
                <View style={styles.conteudo} >
                    <View style={styles.sobre}>
                        <Text style={styles.fs24}>Dados pessoais</Text>
                        <View>
                            <Text style={styles.fs16}>Informações de contato</Text>
                            <Text style={styles.fs12}>Estado civil: <Text style={styles.fs12}>solteiro</Text>
                            </Text>
                            <Text style={styles.fs12}>Telefone: <Text style={styles.fs12}>44 9-97070974</Text>
                            </Text>
                            <Text style={styles.fs12}>Data de nascimneto: <Text style={styles.fs12}>24/10/1999</Text>
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.fs16}>Hábilidades</Text>
                            <Text style={styles.fs12}>HTML | CSS | JavaScript | PHP</Text>
                        </View>
                    </View>
                    <View style={styles.experiencias}>
                        <Text style={styles.fs24}>Experiências</Text>
                        <View>
                            <Text style={styles.fs16}>Empresa:<Text style={styles.fs12}>Digital One</Text></Text>
                            <Text style={styles.fs16}>Cargo:<Text style={styles.fs12}>desenvolvedor web</Text></Text>
                            <Text style={styles.fs16}>Responsabilidades</Text>
                            <Text style={styles.fs12}>Trabalhei no desenvolvimento de sistemas web</Text>
                            <View>
                                <Text style={styles.fs16}>Periodo</Text>
                                <Text style={styles.fs12}>de 05/2021 a 09/2024</Text>
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
