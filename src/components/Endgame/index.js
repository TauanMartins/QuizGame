import React, { forwardRef, useContext, useState } from "react";
import { Modal, ModalBody, Row, Col, Button, Container } from "reactstrap";
import { GlobalState } from "../DataComponents/GlobalState";
import { Link } from "react-router-dom";
import Score from "../Score";

function Endgame({ endgame, visible }, ref) {

    const [open, setOpen] = useState(false);
    const { pontos, name} = useContext(GlobalState);
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
        <Container fluid>
            <Modal className="endgame" size='lg' style={{ minWidth: '50%', minHeight: '10%' }} isOpen={open} >
                <ModalBody>
                    {visible ?
                        <>
                            <Col >
                                <Row className="d-flex justify-content-center align-items-center">
                                    <h4>
                                        <b>
                                            ScoreBoard
                                        </b>
                                    </h4>
                                </Row>
                            </Col>
                            <br />
                        </>
                        :
                        <Col>
                            <Row className="d-flex justify-content-center align-items-center">
                                <h4 >
                                    <b>
                                        Muito bom, {`${name}`}!
                                    </b>
                                    <br />
                                    <b>
                                        Você concluiu o jogo!
                                    </b>
                                </h4>
                            </Row>
                            <Row >
                                <Col>
                                    <Row className="d-flex justify-content-center align-items-center">
                                        Seu score total foi de <b>{' '+pontos+' '}</b> {pontos === 1 ? ' ponto' : ' pontos'}.
                                    </Row>


                                    <Row className="d-flex justify-content-center align-items-center">
                                        <b>
                                            {
                                                pontos >= 9 ? 'Parabéns, você sabe muito!' :
                                                    pontos >= 7 ? 'Ok, você sabe mais ou menos.' :
                                                        pontos >= 3 ? 'Vish, por pouco você não é um burro' :
                                                            pontos >= 0 ? 'Sinto muito!' : ''
                                            }
                                        </b>
                                    </Row>
                                    <Row className="d-flex justify-content-center align-items-center">
                                        Confira sua posição e score abaixo:
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    }
                    <Col>
                        <Row className="justify-content-center">
                            <Score />
                        </Row>
                    </Col>
                    <br />
                    <Col >
                        <Row className="d-flex justify-content-center align-items-center">
                            <Link to="/" >
                                <Button size="lg" color="primary" onClick={handleTooltip} >

                                    Sair

                                </Button>
                            </Link>
                        </Row>
                    </Col>
                    <br />
                </ModalBody>
            </Modal>
        </Container>
    )
}

export default forwardRef(Endgame)