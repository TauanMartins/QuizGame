import React, { forwardRef, useState, useRef } from "react";
import { Label, Modal, ModalBody, Row, Col, Button, Input } from "reactstrap";
import Alert from "../../Alert";
import { selectAllThemes, update } from "../../DataComponents/BD";

function Edit({ Editar }, ref) {

    const [open, setOpen] = useState(false);
    const [editQuestion, setEditQuestion] = useState(undefined);
    const [item, setItem] = useState(undefined)
    const [question, setQuestion] = useState(undefined);
    const [imgPath, setPathImg] = useState(undefined);
    const [themeList, setThemeList] = useState(undefined);
    const [theme, setTheme] = useState(undefined);
    const [difficulty, setDifficulty] = useState(undefined);
    const [answerRight, setAnswerRight] = useState(undefined);
    const [distractionAnswer1, setDistractionAnswer1] = useState(undefined);
    const [distractionAnswer2, setDistractionAnswer2] = useState(undefined);
    const [distractionAnswer3, setDistractionAnswer3] = useState(undefined);

    const [required, setRequired] = useState(false);

    const AlertRef = useRef(null);

    function handleTooltip() {
        setOpen(!open);
    }

    async function editar() {

        if (question === undefined || question === '' ||
            difficulty === undefined || difficulty === '' ||
            answerRight === undefined || answerRight === '' ||
            distractionAnswer1 === undefined || distractionAnswer1 === '') {
            return setRequired(true)
        }
        update(item, {
            question: question,
            img: imgPath,
            theme_fk: theme.id,
            difficulty: difficulty,
            rightAnswer: answerRight,
            distractionAnswer1: distractionAnswer1,
            distractionAnswer2: distractionAnswer2,
            distractionAnswer3: distractionAnswer3
        }).then(response => {
            if (response.error === null) {
                return AlertRef.current.change('Editado')
            } else {
                return AlertRef.current.change()
            }
        })
    }

    ref.current = {
        editar: function (currentQuestion) {
            if (Object.keys(currentQuestion).length >= 1) {
                let question = [JSON.parse(currentQuestion)]
                setOpen(true)
                setEditQuestion(question)
                selectAllThemes().then(response => setThemeList(response.data))
                question.map(item => {
                    console.log(item)
                    setItem(item.id);
                    setQuestion(item.question);
                    setPathImg(item.img === null ? undefined : item.img);
                    setTheme({ id: item.idtheme, name: item.theme })
                    setDifficulty(item.difficulty);
                    setAnswerRight(item.rightAnswer);
                    setDistractionAnswer1(item.distractionAnswer1);
                    setDistractionAnswer2(item.distractionAnswer2 === null ? undefined : item.distractionAnswer2);
                    setDistractionAnswer3(item.distractionAnswer3 === null ? undefined : item.distractionAnswer3);
                    return true;
                })
            }
        },
        ...{ open: open }
    }
    return (
        <>
            <Modal className="Editar" size='lg' style={{ minWidth: '40%', minHeight: '10%', color: 'black' }} isOpen={open} >
                <Alert ref={AlertRef} />
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
                                                    return (
                                                        <div key={item.id}>
                                                            <Label>ID</Label>
                                                            <Input type="text" value={item.id} disabled />
                                                            <br />
                                                            <Label>Questão:</Label>
                                                            <Input invalid={required} type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
                                                            <br />
                                                            <Label>Caminho da imagem:</Label>
                                                            <Input type="text" value={imgPath} onChange={(e) => setPathImg(e.target.value)} />
                                                            <br />
                                                            <Label>Tema da questão:</Label>
                                                            <Input type="select" onChange={e => setTheme(e.target.value)} >
                                                                <option key={'current'} >{theme.name}</option>
                                                                {
                                                                    themeList === undefined ? '' :
                                                                        themeList.map(tema => {
                                                                            return (                                                                                
                                                                                tema.theme===theme.name?'':<option key={tema.id} value={tema.id}>{tema.theme}</option>
                                                                            );
                                                                        })
                                                                }
                                                            </Input>
                                                            <br />
                                                            <Label>Dificuldade:</Label>
                                                            <Input invalid={required} type="select" onChange={(e) => setDifficulty(e.target.value)}>
                                                                <option key={difficulty} value={difficulty}>{difficulty === 'E' ? 'Fácil' : difficulty === 'M' ? 'Médio' : 'Difícil'}</option>
                                                                {difficulty === 'E' ?
                                                                    <>
                                                                        <option key='M' value="M">Médio</option>
                                                                        <option key='H' value="H">Difícil</option>
                                                                    </>
                                                                    : difficulty === 'M' ?
                                                                        <>
                                                                            <option key='E' value="E">Fácil</option>
                                                                            <option key='H' value="H">Difícil</option>
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
                                                            <Input invalid={required} type="text" value={answerRight} onChange={(e) => setAnswerRight(e.target.value)} />
                                                            <br />
                                                            <Label>Distrator 1:</Label>
                                                            <Input invalid={required} type="text" value={distractionAnswer1} onChange={(e) => setDistractionAnswer1(e.target.value)} />
                                                            <br />
                                                            <Label>Distrator 2:</Label>
                                                            <Input type="text" value={distractionAnswer2} onChange={(e) => setDistractionAnswer2(e.target.value)} />
                                                            <br />
                                                            <Label>Distrator 3:</Label>
                                                            <Input type="text" value={distractionAnswer3} onChange={(e) => setDistractionAnswer3(e.target.value)} />
                                                        </div>
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

export default forwardRef(Edit)