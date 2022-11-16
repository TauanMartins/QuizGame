import React, { Fragment, useEffect, useState, useRef } from "react";
import { Row, Col, Card, Container, Table, Input, Button } from "reactstrap";
import './maintence.css';
import Edit from "../../components/Maintence/Edit";
import Remove from "../../components/Maintence/Remove";
import Alert from "../../components/Alert";
import { insert, selectAll, selectAllQtd, selectAllQtdEASY, selectAllQtdHARD, selectAllQtdMEDIUM, selectAllThemes, uploadImage } from "../../components/DataComponents/BD";

export default function Maintence() {
    const [questions, setQuestions] = useState(undefined);
    const [questionsQTD, setQuestionsQTD] = useState(undefined);
    const [questionsEASY, setQuestionsEASY] = useState(undefined);
    const [questionsMEDIUM, setQuestionsMEDIUM] = useState(undefined);
    const [questionsHARD, setQuestionsHARD] = useState(undefined);
    const [question, setQuestion] = useState(undefined);
    const [pathimg, setPathImg] = useState(undefined);
    const [themeList, setThemeList] = useState(undefined);
    const [theme, setTheme] = useState(undefined);
    const [difficulty, setDifficulty] = useState(undefined);
    const [answerRight, setAnswerRight] = useState(undefined);
    const [distractionAnswer1, setDistractionAnswer1] = useState(undefined);
    const [distractionAnswer2, setDistractionAnswer2] = useState('');
    const [distractionAnswer3, setDistractionAnswer3] = useState('');

    const [required, setRequired] = useState(false);

    const EditRef = useRef(null);
    const RemoveRef = useRef(null);
    const AlertRef = useRef(null);


    async function adicionar() {
        if (((distractionAnswer2 === '') && (distractionAnswer3 !== '')) ||
            ((distractionAnswer2 !== '') && (distractionAnswer3 === ''))) {
            return false;
        }
        if ((question === undefined ||
            difficulty === undefined ||
            answerRight === undefined ||
            distractionAnswer1 === undefined)) {
            return setRequired(true);
        }
        uploadImage(pathimg.name, pathimg.img).then(response => console.log(response))
        insert({
            question: question,
            img: pathimg.name,
            theme_fk: theme.id,
            difficulty: difficulty,
            rightAnswer: answerRight,
            distractionAnswer1: distractionAnswer1,
            distractionAnswer2: distractionAnswer2,
            distractionAnswer3: distractionAnswer3
        }).then(response => {
            if (response.error === null) {
                return AlertRef.current.change('Adicionado')
            } else {
                return AlertRef.current.change()
            }
        })
    }

    useEffect(() => {
        selectAll().then(response => { setQuestions(response.data) })
        selectAllThemes().then(response => { setThemeList(response.data) })
        selectAllQtd().then(response => setQuestionsQTD(response.count))
        selectAllQtdEASY().then(response => setQuestionsEASY(response.count))
        selectAllQtdMEDIUM().then(response => setQuestionsMEDIUM(response.count))
        selectAllQtdHARD().then(response => setQuestionsHARD(response.count))
    }, [])

    return (
        <Fragment>
            <div className="edit">
                <Container fluid>
                    <Alert ref={AlertRef} />
                    <br />
                    <Row>
                        <Col>
                            <Card>
                                <Col>
                                    <br />
                                    <Row>
                                        <h6><b>É importante que o número de páginas seja um inteiro para garantir uma maior variabilidade de questões.</b></h6>
                                    </Row>
                                    <Row>
                                        <li>Quantidade de questões gerais: {questionsQTD}</li>
                                    </Row>
                                    <Row>
                                        <li>Quantidade de questões fáceis: {questionsEASY}. Quantidade de páginas: {questionsEASY === undefined ? '' : questionsEASY / 5}</li>
                                    </Row>
                                    <Row>
                                        <li>Quantidade de questões médias: {questionsMEDIUM}. Quantidade de páginas: {questionsMEDIUM === undefined ? '' : questionsMEDIUM / 3}</li>
                                    </Row>
                                    <Row>
                                        <li>Quantidade de questões difíceis: {questionsHARD}. Quantidade de páginas: {questionsHARD === undefined ? '' : questionsHARD / 2}</li>
                                    </Row>
                                    <br />
                                </Col>
                                <Table bordered responsive striped>
                                    <thead>
                                        <tr>
                                            <th style={{ width: "1%" }}>ID</th>
                                            <th style={{ width: "30%" }}>Questão</th>
                                            <th style={{ width: "9%" }}>IMG Desc.</th>
                                            <th style={{ width: "11%" }}>Tema</th>
                                            <th style={{ width: "9%" }}>Dificuldade</th>
                                            <th style={{ width: "10%" }}>R. Certa</th>
                                            <th style={{ width: "10%" }}>R. Distração</th>
                                            <th style={{ width: "10%" }}>R. Distração</th>
                                            <th style={{ width: "10%" }}>R. Distração</th>
                                            <th style={{ width: "10%" }}>Adicionar/Remover/Editar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            questions === undefined ?
                                                <tr key={0}>
                                                    <th scope="row"></th>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                : questions.map(item => {
                                                    return (
                                                        <tr key={item.id}>
                                                            <th key={item.id} scope="row">{item.id}</th>
                                                            <td>{item.question}</td>
                                                            <td className="td">{item.img}</td>
                                                            <td className="td">{item.theme}</td>
                                                            <td className="td">{item.difficulty}</td>
                                                            <td className="td">{item.rightAnswer}</td>
                                                            <td className="td">{item.distractionAnswer1}</td>
                                                            <td className="td">{item.distractionAnswer2}</td>
                                                            <td className="td">{item.distractionAnswer3}</td>
                                                            <td className="td"><Button onClick={(e) => { EditRef.current.editar(e.target.value) }} value={JSON.stringify(item)} color="warning">Editar</Button>{' '}
                                                                <Button onClick={(e) => RemoveRef.current.remover(e.target.value)} value={JSON.stringify(item)} color="danger">Remover</Button></td>
                                                        </tr>
                                                    );
                                                })
                                        }
                                        <tr key={'last'}>
                                            <th key={'last'} scope="row"></th>
                                            <td><Input invalid={required} type='textarea' onChange={e => setQuestion(e.target.value)} placeholder="Questão"></Input></td>
                                            <td className="td">
                                                <Input type='file' onChange={e => { setPathImg({ name: e.target.files[0].name, img: e.target.files[0] }) }} />
                                                <Input type='text' placeholder="Nome da IMG" onChange={e => setPathImg({ name: e.target.value, img: e.target.value })} /></td>
                                            <td><Input invalid={required} type="select" onChange={e => setTheme(e.target.value)} >
                                                <option >Selecione</option>
                                                {
                                                    themeList === undefined ? '' :
                                                        themeList.map(tema => {
                                                            return (
                                                                <option key={tema.id} value={{id: tema.id, tema:tema.theme}}>{tema.theme}</option>
                                                            );
                                                        })
                                                }
                                            </Input>
                                            </td>
                                            <td><Input invalid={required} type="select" onChange={e => setDifficulty(e.target.value)} >
                                                <option >Selecione</option>
                                                <option key="E" value="E">Fácil</option>
                                                <option key="M" value="M">Médio</option>
                                                <option key="H" value="H">Difícil</option>
                                            </Input>
                                            </td>
                                            <td><Input type='text' invalid={required} onChange={e => setAnswerRight(e.target.value)} placeholder="Resposta" /></td>
                                            <td><Input type='text' invalid={required} onChange={e => setDistractionAnswer1(e.target.value)} placeholder="Distração" /></td>
                                            <td><Input type='text' invalid={(distractionAnswer2 === '') && (distractionAnswer3 !== '')}
                                                onChange={e => setDistractionAnswer2(e.target.value)} placeholder="Distração" /></td>
                                            <td><Input type='text' invalid={(distractionAnswer2 !== '') && (distractionAnswer3 === '')}
                                                onChange={e => setDistractionAnswer3(e.target.value)} placeholder="Distração" /></td>
                                            <td className="td"><Button onClick={adicionar} color="primary">Adicionar</Button></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Edit ref={EditRef} />
                <Remove ref={RemoveRef} />
            </div>
        </Fragment >

    )
}

