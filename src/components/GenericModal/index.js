import React, { forwardRef, useState } from "react";
import { Modal, ModalBody, Row, Col, Button, Container } from "reactstrap";
import { Link } from "react-router-dom";

function GenericModal({ Label, Content }, ref) {

    const [open, setOpen] = useState(false);

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
                                    {Label}
                                </b>
                            </h4>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="justify-content-center">
                            {Content}
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

export default forwardRef(GenericModal)