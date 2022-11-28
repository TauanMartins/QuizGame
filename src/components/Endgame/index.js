import React, { forwardRef, useContext, useState } from "react";
import { Modal, ModalBody, Row, Col, Button, Container } from "reactstrap";
import { GlobalState } from "../DataComponents/GlobalState";
import { Link } from "react-router-dom";
import ScoreHistory from "../ScoreHistory";
import ScoreClassic from "../ScoreClassic";
import ScoreInfinite from "../ScoreInfinite";

function Endgame({ nothing }, ref) {

    const [open, setOpen] = useState(false);
    const [questionNumberDisplay, setQuestionNumberDisplay] = useState(0);
    const [gameMode, setGameMode] = useState(undefined);

    const { pontos, name } = useContext(GlobalState);

    function handleTooltip() {
        setOpen(!open);
    }
    ref.current = {
        endgame: function (qNumberDisplay, gameMode) {
            setQuestionNumberDisplay(qNumberDisplay);
            setGameMode(gameMode)
            setOpen(true)
        },
        ...{ open: open }
    }
    return (
        <Container fluid>
            <Modal className="endgame" size='lg' style={{ minWidth: '50%', minHeight: '10%' }} isOpen={open} >
                <ModalBody>
                    <Col>
                        <Row className="d-flex justify-content-center align-items-center">
                            <h4 >
                                <b>
                                    Muito bom, {`${name}`}!
                                </b>
                            </h4>
                        </Row>
                        <Row className="d-flex justify-content-center align-items-center">
                            <h4 >
                                {questionNumberDisplay < 10 ?
                                    <b>
                                        Porém, infelizmente não temos questões suficientes para o tema escolhido.
                                    </b>
                                    :
                                    <b>
                                        Você concluiu o jogo!
                                    </b>}

                            </h4>
                        </Row>
                        <Row >
                            <Col>
                                <Row className="d-flex justify-content-center align-items-center">
                                    {'Seu score total foi de '}
                                    {Math.floor(pontos)}
                                    {pontos === 1 ? ' ponto' : ' pontos'}.
                                </Row>


                                <Row className="d-flex justify-content-center align-items-center">
                                    <b>
                                        {
                                            pontos >= 13500 ? 'Parabéns, você sabe muito!' :
                                                pontos >= 8000 ? 'Ok, você sabe mais ou menos.' :
                                                    pontos >= 5000 ? 'Vish, por pouco você não é um burro' :
                                                        pontos >= 3000 ? 'Sinto muito!' : ''
                                        }
                                    </b>
                                </Row>
                                <Row className="d-flex justify-content-center align-items-center">
                                    Confira sua posição e score abaixo:
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="justify-content-center">
                            {gameMode === 1 ?
                                <ScoreHistory /> : gameMode === 2 ?
                                    <ScoreClassic /> : gameMode === 3 ?
                                        <ScoreInfinite /> : ''
                            }

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
        </Container >
    )
}

export default forwardRef(Endgame)