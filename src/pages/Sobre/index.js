import React, { Fragment } from "react";
import { Row, Col, Card, Container, CardText } from "reactstrap";
import './sobre.css';

export default function Sobre() {

    return (

        <Fragment>
            <div className="Sobre">
                <Container fluid>
                    <br />
                    <Row>
                        <Col>
                            <Card style={{ minHeight: '300px' }}>
                                <CardText>
                                    <Col md={12}>
                                        <Row>
                                            <Col className="d-flex justify-content-center align-items-center " >
                                                <h5><b>Bem-vindo ao nosso site!</b></h5>
                                            </Col>
                                        </Row>
                                        <br />
                                        <Row>
                                            <Col md={4}>
                                                <li>Este site é fruto do trabalho final da displina de <u>Projetos de Jogos</u>.</li>
                                            </Col>
                                            <Col md={4}>
                                            </Col>
                                            <Col md={4}>
                                                <></>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col >
                                                <li>O grupo do trabalho final é composto por 6 integrantes: Tauan, Rafael, Ian, Pedro, Matheus e Gustavo.</li>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <li>O trabalho final é um jogo Quiz que possui 3 modos de jogo. No <u><b>primeiro modo de jogo</b></u> você é um personagem de uma história e deve responder
                                                    perguntas certas relacionadas ao prólogo inicial para atingir o objetivo final. No <u><b>segundo modo de jogo</b></u> é um quiz aleatório com perguntas
                                                    infinitas e triviais (ou até acabarem as perguntas do banco de dados) onde você tem 3 vidas e ao acabarem as vidas o jogo se encerra. No <u><b>terceiro
                                                        e último modo de jogo</b></u> você tem 10 perguntas (perguntas aleatórias e triviais) para responder e a cada pergunta você ganha um poder que ao ativar
                                                    desbloqueia uma nova habilidade, ao final do jogo você recebe uma colocação e seu score entra no banco de dados junto com todos os outros jogadores. </li>
                                            </Col>
                                        </Row>
                                    </Col>
                                </CardText>
                            </Card>
                        </Col>
                    </Row>
                    <br />
                </Container>
            </div>
        </Fragment >

    )
}

