import React, { forwardRef, useState } from "react";
import { Modal, ModalBody, Row, Col, Button, Container } from "reactstrap";
import { Link } from "react-router-dom";
import ScoreHistory from "../ScoreHistory";
import ScoreClassic from "../ScoreClassic";
import ScoreInfinite from "../ScoreInfinite";

function AllScoreboard({ n }, ref) {

    const [open, setOpen] = useState(false);
    const [option, setOption] = useState(undefined);

    function handleTooltip() {
        setOpen(!open);
    }
    ref.current = {
        open: function () {
            setOpen(true)
        }
    }

    return (
        <Container fluid>
            <Modal className="genericModal" size='lg' style={{ minWidth: '50%', minHeight: '10%' }} isOpen={open} >
                <ModalBody>
                    <Col >
                        <Row className="d-flex justify-content-center align-items-center">
                            <h4>
                                <b>
                                    {'ScoreBoard '}
                                    {option === 1 ?
                                        'Modo História' : option === 2 ?
                                            'Modo Classic' : option === 3 ?
                                                'Modo Infinito' : ''
                                    }
                                </b>
                            </h4>
                        </Row>
                        <Row className="d-flex justify-content-center align-items-center">
                            <Col>
                                <Row className="d-flex justify-content-center align-items-center">
                                    <Button color='primary' onClick={() => setOption(1)}>Modo História</Button>
                                </Row>
                            </Col>
                            <Col>
                                <Row className="d-flex justify-content-center align-items-center">
                                    <Button color='warning' onClick={() => setOption(2)}>Modo Clássico</Button>
                                </Row>
                            </Col>
                            <Col>
                                <Row className="d-flex justify-content-center align-items-center">
                                    <Button color='danger' onClick={() => setOption(3)}>Modo Infinito</Button>
                                </Row>
                            </Col>
                        </Row>
                        <br />
                    </Col>
                    <Col>
                        <Row className="justify-content-center" >
                            {option === 1 ?
                                <ScoreHistory /> : option === 2 ?
                                    <ScoreClassic /> : option === 3 ?
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
        </Container>
    )
}

export default forwardRef(AllScoreboard)