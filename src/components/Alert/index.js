import React, { Fragment, useState, forwardRef } from "react";
import { Row, Col, Modal, ModalHeader } from "reactstrap";

function AlertComp({a}, ref) {
    const [alert, setAlert] = useState(false);
    const [mensagem, setMensagem] = useState('Erro!');
    function handleTooltip() {
        setAlert(!alert);
        setTimeout(window.location.reload(), 1000)
    }

    ref.current = {
        change: function (msg) {
            if(msg!==undefined){
                setMensagem(msg)
            }
            return setAlert(true);
        }
    }

    return (

        <Fragment>
            <Modal isOpen={alert} style={{ color: 'black' }} centered >
                <ModalHeader toggle={handleTooltip} >
                    <Row>
                <Col style={{ color: 'white' }}>
                 '""""""""""""""""
                </Col>
                <Col className="d-flex justify-content-center align-items-center">
                    <h4 style={{ color: mensagem !== 'Erro!' ? '#218838' : '#c82333' }}><b>{mensagem}</b></h4>
                </Col>
                </Row>
                </ModalHeader >
            </Modal>
        </Fragment >
    )
}
export default forwardRef(AlertComp)
