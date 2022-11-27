import React, { Fragment } from "react";
import { Row, Col, Card, Container, CardBody } from "reactstrap";
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
                                <CardBody>
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
                                                <li>O trabalho final é um jogo Quiz que possui 3 modos de jogo.</li>
                                                <li>
                                                    No <u><b>primeiro modo de jogo History</b></u> você deve responder
                                                    perguntas relacionadas ao Universo Cinemátográfico da Marvel, nesse modo você além de testar seus conhecimentos sobre esse mundo se divertirá adquirindo mais conhecimento quando erra alguma pergunta.
                                                </li>
                                                <li>
                                                    No <u><b>segundo modo de jogo Classic</b></u> você tem 10 perguntas (perguntas aleatórias e triviais) para responder e a cada sequência de 3 perguntas certas você ganha 2 opções de poder que ao ativar
                                                    ativa uma ação, ao final do jogo você recebe uma colocação e seu score entra no banco de dados junto com todos os outros jogadores.
                                                </li>
                                                <li>
                                                    No <u><b>terceiro e último modo de jogo Infinite</b></u> você conta com perguntas
                                                    infinitas e triviais (ou até acabarem as perguntas do banco de dados) onde você tem 3 vidas e ao acabarem as vidas o jogo se encerra.
                                                </li>
                                                <br/>
                                                <li>
                                                    Todos os 3 modos de jogo possuem: Poderes ao acertar múltiplas questões, Pontuações exclusivas para cada tipo de questão, Tempo cronometrado e Score no final do jogo compondo a colocação do jogador.
                                                    1 dos modos de jogo possui: 3 vidas que irão acabando à medida que o usuário erra questões.
                                                </li>
                                            </Col>
                                        </Row>
                                    </Col>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <br />
                </Container>
            </div>
        </Fragment >

    )
}

