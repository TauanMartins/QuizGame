import React, { forwardRef, useState } from "react";
import { Label, Modal, ModalBody, Row, Col, Button, Input } from "reactstrap";
import axios from "axios";

function Editar({ Editar }, ref) {

    const [open, setOpen] = useState(false);
    const [editQuestion, setEditQuestion] = useState(undefined);
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

    async function editar() {

        // abaixo p postar uma pergunta
        // const resp = await axios.patch(process.env.REACT_APP_SUPABASEURL + process.env.REACT_APP_EDITQUESTION + item,
        //     {
        //         question: question, img: pathimg, difficulty: difficulty, rightAnswer: answerRight, distractionAnswer1: distractionAnswer1, distractionAnswer2: distractionAnswer2, distractionAnswer3: distractionAnswer3
        //     },
        //     {
        //         headers: {
        //             apikey: process.env.REACT_APP_APIKEY,
        //             'Content-Type': 'application/json',
        //             'Prefer': 'return=representation'
        //         }
        //     });
        // console.log(resp)
        await axios.patch(process.env.REACT_APP_SUPABASEURL + process.env.REACT_APP_EDITQUESTION + item,
            {
                question: question, img: pathimg, difficulty: difficulty, rightAnswer: answerRight, distractionAnswer1: distractionAnswer1, distractionAnswer2: distractionAnswer2, distractionAnswer3: distractionAnswer3
            },
            {
                headers: {
                    apikey: process.env.REACT_APP_APIKEY,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                }
            }).then(function (response) { return alert("Editado!") }).catch(function (error) { return alert("Erro!") })
        setTimeout(setOpen(false), 3000)
        window.location.reload();
    }

    ref.current = {
        editar: function (currentQuestion) {
            if (Object.keys(currentQuestion).length >= 1) {
                let question = [JSON.parse(currentQuestion)]
                setOpen(true)
                setEditQuestion(question)
                question.map(item => {
                    setItem(item.id);
                    setQuestion(item.question);
                    setpathimg(item.img);
                    setDifficulty(item.difficulty);
                    setanswerRight(item.rightAnswer);
                    setDistractionAnswer1(item.distractionAnswer1);
                    setDistractionAnswer2(item.distractionAnswer2);
                    setDistractionAnswer3(item.distractionAnswer3);
                    return true;
                })
            }
        },
        ...{ open: open }
    }
    return (
        <>
            <Modal className="Editar" size='lg' style={{ minWidth: '40%', minHeight: '10%', color: 'black' }} isOpen={open} >
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
                                                    Você quer alterar esta questão?
                                                </b>
                                            </h4>
                                        </Label>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col>
                                        {
                                            editQuestion === undefined ? '' :
                                                editQuestion.map(item => {
                                                    return (<>
                                                        <Label>Questão número {item.id}</Label>
                                                        <br />
                                                        <Label>Questão:</Label>
                                                        <Input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
                                                        <br />
                                                        <Label>Caminho da imagem:</Label>
                                                        <Input type="text" value={pathimg} onChange={(e) => setpathimg(e.target.value)} />
                                                        <br />
                                                        <Label>Dificuldade:</Label>
                                                        <Input type="select" onChange={(e) => setDifficulty(e.target.value)}>
                                                            <option key={difficulty} value={difficulty}>{difficulty === 'E' ? 'Fácil' : difficulty === 'M' ? 'Médio' : 'Difícil'}</option>
                                                            {difficulty === 'E' ?
                                                                <>
                                                                    <option key='M' value="M">Médio</option>
                                                                    <option key='D' value="D">Difícil</option>
                                                                </>
                                                                : difficulty === 'M' ?
                                                                    <>
                                                                        <option key='E' value="E">Fácil</option>
                                                                        <option key='D' value="D">Difícil</option>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <option key='M' value="M">Médio</option>
                                                                        <option key='E' value="E">Fácil</option>
                                                                    </>
                                                            }
                                                        </Input>
                                                        <br />
                                                        <Label>Resposta Correta:</Label>
                                                        <Input type="text" value={answerRight} onChange={(e) => setanswerRight(e.target.value)} />
                                                        <br />
                                                        <Label>Distrator 1:</Label>
                                                        <Input type="text" value={distractionAnswer1} onChange={(e) => setDistractionAnswer1(e.target.value)} />
                                                        <br />
                                                        <Label>Distrator 2:</Label>
                                                        <Input type="text" value={distractionAnswer2} onChange={(e) => setDistractionAnswer2(e.target.value)} />
                                                        <br />
                                                        <Label>Distrator 3:</Label>
                                                        <Input type="text" value={distractionAnswer3} onChange={(e) => setDistractionAnswer3(e.target.value)} />
                                                    </>
                                                    );
                                                })}

                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col style={{ textAlign: 'center' }}>
                                        <Button size="lg" color="primary" onClick={editar} >
                                            Editar
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

export default forwardRef(Editar)