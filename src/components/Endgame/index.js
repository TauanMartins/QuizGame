import React, { forwardRef, useState } from "react";
import { Label, Modal, ModalBody, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";

function Endgame({ endgame }, ref) {

    const [open, setOpen] = useState(false);
    const [score, setScore] = useState(0)
    function handleTooltip() {
        setOpen(!open);
    }
    ref.current = {
        endgame: function (score) {
            setOpen(true)
            setScore(score)
        },
        ...{ open: open }
    }
    return (
        <>
            <Modal style={{ minWidth: '40%', minHeight: '10%' }} isOpen={open} >
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
                                        <Label>
                                            <h4>
                                                <b>
                                                    Muito bom! Você concluiu o jogo!
                                                </b>
                                            </h4>
                                        </Label>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col style={{ textAlign: "center" }}>
                                        <Label>
                                            Seu score total foi de <b>{score}</b> {score===1?'ponto':'pontos'}.
                                            <br />
                                            <b>
                                                {
                                                    score >= 9 ? 'Parabéns, você sabe muito sobre futebol' :
                                                        score >= 7 ? 'Ok, você sabe mais ou menos sobre o mundo do futebol' :
                                                            score >= 3 ? 'Vish, por pouco você não é um noob' :
                                                                score >= 0 ? 'Sinto muito, futebol não é sua praia!' : ''
                                                }
                                            </b>
                                        </Label>
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
        </>
    )
}

export default forwardRef(Endgame)