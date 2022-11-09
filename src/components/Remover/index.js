import React, { forwardRef, useState, useRef } from "react";
import { Label, Modal, ModalBody, Row, Col, Button } from "reactstrap";
import Alert from "../Alert";
import { deleteR } from "../../components/DataComponents/BD";

function Remover({ Remover }, ref) {

    const [open, setOpen] = useState(false);
    const [removeQuestion, setRemoveQuestion] = useState(undefined)
    const [item, setItem] = useState(undefined)
    const [question, setQuestion] = useState(undefined);
    const [imgPath, setPathImg] = useState(undefined);
    const [imgAlt, setAltImg] = useState(undefined);
    const [difficulty, setDifficulty] = useState(undefined);
    const [answerRight, setAnswerRight] = useState(undefined);
    const [distractionAnswer1, setDistractionAnswer1] = useState(undefined);
    const [distractionAnswer2, setDistractionAnswer2] = useState(undefined);
    const [distractionAnswer3, setDistractionAnswer3] = useState(undefined);

    const AlertRef = useRef(null);

    function handleTooltip() {
        setOpen(!open);
    }

    async function remover() {
        deleteR(item).then(response => {
            if (response.error === null) {
                return AlertRef.current.change('Removido')
            } else {
                return AlertRef.current.change()
            }
        })
    }
    ref.current = {
        remover: function (currentQuestion) {
            if (Object.keys(currentQuestion).length >= 1) {
                let question = [JSON.parse(currentQuestion)]
                setOpen(true)
                setRemoveQuestion(question)
                question.map(item => {
                    setItem(item.id);
                    setQuestion(item.question);
                    setPathImg(item.img);
                    setAltImg(item.imgAlt);
                    setDifficulty(item.difficulty);
                    setAnswerRight(item.rightAnswer);
                    setDistractionAnswer1(item.distractionAnswer1);
                    setDistractionAnswer2(item.distractionAnswer2);
                    setDistractionAnswer3(item.distractionAnswer3);
                    return true
                })
            }
        },
        ...{ open: open }
    }
    return (
        <>
            <Modal className="remover" size='lg' style={{ minWidth: '40%', minHeight: '10%', color: 'black' }} isOpen={open} >
                <Alert ref={AlertRef} />
                <Row>
                    <Col>
                        <ModalBody>
                            <Col>
                                <Row >
                                    <Col style={{ textAlign: "center" }}>
                                        <h4>
                                            <b>
                                                Confirme os dados da questão para exclusão.
                                            </b>
                                        </h4>
                                        <br />
                                    </Col>
                                </Row>
                                <Row >
                                    <Col >
                                        <Label>
                                            <b>
                                                {
                                                    removeQuestion === undefined ? '' :
                                                        removeQuestion.map(item => {
                                                            return (
                                                                <div key={item.id}>
                                                                    <Label>ID: {item.id}</Label>
                                                                    <br />
                                                                    <Label>Questão: {question}</Label>
                                                                    <br />
                                                                    <Label>Caminho da imagem: {imgPath}</Label>
                                                                    <br />
                                                                    <Label>Descrição da imagem: {imgAlt}</Label>
                                                                    <br />
                                                                    <Label>Dificuldade: {difficulty}</Label>
                                                                    <br />
                                                                    <Label>Resposta Correta: {answerRight}</Label>
                                                                    <br />
                                                                    <Label>Distrator 1: {distractionAnswer1}</Label>
                                                                    <br />
                                                                    <Label>Distrator 2: {distractionAnswer2}</Label>
                                                                    <br />
                                                                    <Label>Distrator 3: {distractionAnswer3}</Label>
                                                                </div>
                                                            );
                                                        })}

                                            </b>
                                        </Label>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col style={{ textAlign: 'center' }}>
                                        <Button size="lg" color="danger" onClick={remover} >
                                            Excluir
                                        </Button>
                                        {' '}
                                        <Button size="lg" onClick={handleTooltip} >
                                            Cancelar
                                        </Button>
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

export default forwardRef(Remover)