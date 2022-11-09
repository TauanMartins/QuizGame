import React, { Fragment, useState, forwardRef, useContext } from "react";
import { Link } from "react-router-dom";
import { Col, Modal, ModalBody, Input, Button, Container, ModalHeader, Label } from "reactstrap";
import { GlobalState } from "../../components/DataComponents/GlobalState";

function NameComp({ a }, ref) {
    const [abrir, setAbrir] = useState(false);
    const { setName } = useContext(GlobalState)

    function handleTooltip() {
        setAbrir(!abrir);
    }
    ref.current = {
        adicionarName: function () {
            setAbrir(true)
        }
    }

    return (

        <Fragment>
            <Container fluid>
                <Modal centered isOpen={abrir} style={{ color: 'black' }} className="contained-modal-title-vcenter" >
                    <ModalHeader toggle={handleTooltip}>
                        <h4>Digite seu nome para fazer parte do HighScore no final</h4>
                    </ModalHeader>
                    <ModalBody >
                        <Col>
                            <Label style={{ textAlign: 'left' }}>Nome:</Label>
                        </Col>
                        <Col style={{ textAlign: 'center' }}>
                            <Input placeholder='João' onChange={e => setName(e.target.value)} />
                            <br />
                            <Link to="/game" >
                                <Button className="Button" size="lg" color="primary" >
                                    {"Jogar"}
                                </Button>
                            </Link>
                        </Col>
                    </ModalBody>
                </Modal>
            </Container>
        </Fragment >
    )
}
export default forwardRef(NameComp)
