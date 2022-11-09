import React, { forwardRef, useContext, useState } from "react";
import {Modal, ModalBody, Row, Col, Button, Container } from "reactstrap";
import { GlobalState } from "../DataComponents/GlobalState";
import { Link } from "react-router-dom";
import Score from "../Score";

function Endgame({ endgame }, ref) {

    const [open, setOpen] = useState(false);
    const { pontos } = useContext(GlobalState);
    function handleTooltip() {
        setOpen(!open);
    }
    ref.current = {
        endgame: function () {
            setOpen(true)
        },
        ...{ open: open }
    }
    return (
        <Container>
            <Modal className="endgame" size='lg' style={{ minWidth: '40%', minHeight: '10%' }} isOpen={open} >
                <Row>
                    <Col>
                        <ModalBody>
                            <Col>
                                <Row >
                                    <Col style={{ textAlign: "center" }}>

                                    </Col>
                                </Row>
                                <Row >
                                    <Col style={{ textAlign: "center" }}>
                                        <h4>
                                            <b>
                                                Muito bom! Você concluiu o jogo!
                                            </b>
                                        </h4>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col style={{ textAlign: "center" }}>
                                        Seu score total foi de <b>{pontos}</b> {pontos === 1 ? 'ponto' : 'pontos'}.
                                        <br />
                                        <b>
                                            {
                                                pontos >= 9 ? 'Parabéns, você sabe muito!' :
                                                    pontos >= 7 ? 'Ok, você sabe mais ou menos.' :
                                                        pontos >= 3 ? 'Vish, por pouco você não é um burro' :
                                                            pontos >= 0 ? 'Sinto muito!' : ''
                                            }
                                        </b>
                                        <br />
                                        Confira se você está entre os melhores na tabela abaixo:
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ textAlign: "center" }}>
                                        <Score/>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col style={{ textAlign: 'center' }}>
                                        <Link to="/" >
                                            <Button size="lg" color="primary" onClick={handleTooltip} >

                                                Sair

                                            </Button>
                                        </Link>
                                    </Col>
                                </Row>
                                <br />
                            </Col>
                        </ModalBody>
                    </Col>
                </Row>
            </Modal>
        </Container>
    )
}

export default forwardRef(Endgame)