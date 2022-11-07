import React, { Fragment, useEffect, useState, useRef } from "react";
import { Row, Col, Card, Container, Table, Input, Button } from "reactstrap";
import './selectANDedit.css';
import axios from "axios";
import Editar from "../../components/Editar";
import Remover from "../../components/Remover";

export default function Sobre() {
    const [questions, setQuestions] = useState(undefined);
    const [question, setQuestion] = useState(undefined);
    const [pathimg, setpathimg] = useState(undefined);
    const [difficulty, setDifficulty] = useState(undefined);
    const [answerRight, setanswerRight] = useState(undefined);
    const [distractionAnswer1, setDistractionAnswer1] = useState(undefined);
    const [distractionAnswer2, setDistractionAnswer2] = useState(undefined);
    const [distractionAnswer3, setDistractionAnswer3] = useState(undefined);
    const EditarRef = useRef(null);
    const RemoverRef = useRef(null);

    async function adicionar() {
        await axios.post(process.env.REACT_APP_SUPABASEURL + process.env.REACT_APP_POSTQUESTION,
            {
                question: question, img: pathimg, difficulty: difficulty, rightAnswer: answerRight, distractionAnswer1: distractionAnswer1, distractionAnswer2: distractionAnswer2, distractionAnswer3: distractionAnswer3
            },
            {
                headers: {
                    apikey: process.env.REACT_APP_APIKEY,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                }
            }).then(function (response) { return alert("Adicionado!") }).catch(function (error) { return alert("Erro!") })
        setTimeout(window.location.reload(), 3000)
        
    }
    useEffect(() => {
        async function getQuestion() {
            const resp = await axios.get(process.env.REACT_APP_SUPABASEURL + process.env.REACT_APP_ALLQUESTIONS,
                {
                    headers: {
                        apikey: process.env.REACT_APP_APIKEY
                    }
                });
            const json = await resp.data
            setQuestions(json)
        }
        getQuestion()
    }, [])
    return (

        <Fragment>
            <div className="selectANDedit">
                <Container fluid>
                    <br />
                    <Row>
                        <Col>
                            <Card>
                                <Table bordered responsive striped>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Questão</th>
                                            <th>IMG path</th>
                                            <th>Dificuldade</th>
                                            <th>R. Certa</th>
                                            <th>R. Distração</th>
                                            <th>R. Distração</th>
                                            <th>R. Distração</th>
                                            <th>Adicionar/Remover/Editar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            questions === undefined ?
                                                <tr key={1}>
                                                    <th scope="row"></th>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>EDITAR</td>
                                                </tr>
                                                : questions.map(item => {
                                                    return (
                                                        <tr key={item.id}>
                                                            <th scope="row">{item.id}</th>
                                                            <td>{item.question}</td>
                                                            <td>{item.img}</td>
                                                            <td>{item.difficulty}</td>
                                                            <td>{item.rightAnswer}</td>
                                                            <td>{item.distractionAnswer1}</td>
                                                            <td>{item.distractionAnswer2}</td>
                                                            <td>{item.distractionAnswer3}</td>
                                                            <td><Button onClick={(e) => { EditarRef.current.editar(e.target.value) }} value={JSON.stringify(item)} color="warning">Editar</Button>{' '}
                                                                <Button onClick={(e) => RemoverRef.current.remover(e.target.value)} value={JSON.stringify(item)} color="danger">Remover</Button></td>
                                                        </tr>
                                                    );
                                                })
                                        }
                                        <tr key={'last'}>
                                            <th scope="row"></th>
                                            <td><Input type='textarea' onChange={e => setQuestion(e.target.value)} placeholder="Questão"></Input></td>
                                            <td><Input type='text' onChange={e => setpathimg(e.target.value)} placeholder="Caminho da IMG"></Input></td>
                                            <td><Input type="select" onChange={e => setDifficulty(e.target.value)} >
                                                <option value="E">Selecione</option>
                                                <option value="E">Fácil</option>
                                                <option value="M">Médio</option>
                                                <option value="D">Difícil</option>
                                            </Input>
                                            </td>
                                            <td><Input type='text' onChange={e => setanswerRight(e.target.value)} placeholder="Resposta Certa" /></td>
                                            <td><Input type='text' onChange={e => setDistractionAnswer1(e.target.value)} placeholder="Distração" /></td>
                                            <td><Input type='text' onChange={e => setDistractionAnswer2(e.target.value)} placeholder="Distração" /></td>
                                            <td><Input type='text' onChange={e => setDistractionAnswer3(e.target.value)} placeholder="Distração" /></td>
                                            <td><Button onClick={adicionar} color="primary">Adicionar</Button></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Editar ref={EditarRef} />
            <Remover ref={RemoverRef} />
        </Fragment >

    )
}

