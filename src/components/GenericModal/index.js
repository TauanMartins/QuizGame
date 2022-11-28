import React, { forwardRef, useState } from "react";
import { Modal, ModalBody, Row, Col, Button, Container } from "reactstrap";
import { getImage } from "../DataComponents/BD";

function GenericModal({ n }, ref) {

    const [open, setOpen] = useState(false);
    const [label, setLabel] = useState(undefined);
    const [content, setContent] = useState(undefined);
    const [img, setImg] = useState(undefined);
    async function downloadImage(path) {
        try {
            getImage(path).then(response => {
                if (response.data === null) {
                    return setImg(undefined)
                } else {
                    const url = URL.createObjectURL(response.data)
                    setImg(url)
                }
            })
        } catch (error) {
            console.log('Error downloading image: ', error)
        }
    }
    function handleTooltip() {
        setOpen(!open);
    }
    ref.current = {
        open: function (label, content, img) {
            setLabel(label)
            setContent(content)
            downloadImage(img)
            setOpen(true)
        }
    }

    return (
        <Container fluid>
            <Modal className="genericModal" size='lg' style={{ minWidth: '50%', minHeight: '500px' }} isOpen={open} >
                <ModalBody>
                    <Col >
                        <Row className="d-flex justify-content-center align-items-center">
                            <h4>
                                <b>
                                    {label}
                                </b>
                            </h4>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="justify-content-center">
                            {content}
                        </Row>
                    </Col>
                    <Col>
                        <Row className="justify-content-center">
                            {img === null || img === undefined ? '' :
                                <img id="img" style={{maxWidth: '80%'}} alt={`contexto da questão`} src={img} />}
                        </Row>
                    </Col>
                    <br />
                    <Col >
                        <Row className="d-flex justify-content-center align-items-center">
                            <Button outline size="lg" color="primary" onClick={handleTooltip} >
                                Entendi a história! Fecha aí
                            </Button>
                        </Row>
                    </Col>
                    <br />
                </ModalBody>
            </Modal>
        </Container>
    )
}

export default forwardRef(GenericModal)