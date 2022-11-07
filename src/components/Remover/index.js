import React, { forwardRef, useState } from "react";
import { Label, Modal, ModalBody, Row, Col, Button } from "reactstrap";
import axios from "axios";

function Remover({ Remover }, ref) {

    const [open, setOpen] = useState(false);
    const [removeQuestion, setRemoveQuestion] = useState(undefined)
    const [item, setItem] = useState(undefined)
    const [question, setQuestion] = useState(undefined);
    const [pathimg, setpathimg] = useState(undefined);
    const [difficulty, setDifficulty] = useState(undefined);
    const [answerRight, setanswerRight] = useState(undefined);
    const [distractionAnswer1, setDistractionAnswer1] = useState(undefined);
    const [distractionAnswer2, setDistractionAnswer2] = useState(undefined);
    const [distractionAnswer3, setDistractionAnswer3] = useState(undefined);
    function handleTooltip() {
        setOpen(!open);
    }

    async function remover() {
        await axios.delete(process.env.REACT_APP_SUPABASEURL + process.env.REACT_APP_EDITQUESTION + item,
            {
                headers: {
                    apikey: process.env.REACT_APP_APIKEY,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                }
            }).then(function (response) { return alert("Removido!") }).catch(function (error) { return alert("Erro!") })
        setTimeout(setOpen(false), 3000)
        window.location.reload();
    }
    ref.current = {
        remover: function (currentQuestion) {
            let question = [JSON.parse(currentQuestion)]
            setOpen(true)
            setRemoveQuestion(question)
            question.map(item => {
                setItem(item.id);
                setQuestion(item.question);
                setpathimg(item.img);
                setDifficulty(item.difficulty);
                setanswerRight(item.rightAnswer);
                setDistractionAnswer1(item.distractionAnswer1);
                setDistractionAnswer2(item.distractionAnswer2);
                setDistractionAnswer3(item.distractionAnswer3);
                return console.log(item.id)
            })
        },
        ...{ open: open }
    }
    return (
        <>
            <Modal className="remover" size='lg' style={{ minWidth: '40%', minHeight: '10%', color: 'black' }} isOpen={open} >
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
                                                            return (<>
                                                                <Label>Questão número {item.id}</Label>
                                                                <br />
                                                                <Label>Questão: {question}</Label>
                                                                <br />
                                                                <Label>Caminho da imagem: {pathimg}</Label>
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
                                                            </>
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