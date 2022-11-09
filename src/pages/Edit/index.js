import React, { Fragment, useEffect, useState, useRef } from "react";
import { Row, Col, Card, Container, Table, Input, Button } from "reactstrap";
import './edit.css';
import Editar from "../../components/Editar";
import Remover from "../../components/Remover";
import Alert from "../../components/Alert";
import { insert, selectAll } from "../../components/DataComponents/BD";

export default function Edit() {
    const [questions, setQuestions] = useState(undefined);
    const [question, setQuestion] = useState(undefined);
    const [pathimg, setPathImg] = useState(undefined);
    const [imgAlt, setAltImg] = useState(undefined);
    const [difficulty, setDifficulty] = useState(undefined);
    const [answerRight, setAnswerRight] = useState(undefined);
    const [distractionAnswer1, setDistractionAnswer1] = useState(undefined);
    const [distractionAnswer2, setDistractionAnswer2] = useState('');
    const [distractionAnswer3, setDistractionAnswer3] = useState('');

    const [required, setRequired] = useState(false);

    const EditarRef = useRef(null);
    const RemoverRef = useRef(null);
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
        insert({
            question: question,
            img: pathimg,
            imgAlt: imgAlt,
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
        selectAll().then(response => { console.log(response); setQuestions(response.data) })
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
                                <Table bordered responsive striped>
                                    <thead>
                                        <tr>
                                            <th style={{ width: "1%" }}>ID</th>
                                            <th style={{ width: "30%" }}>Questão</th>
                                            <th style={{ width: "5%" }}>IMG Path</th>
                                            <th style={{ width: "5%" }}>IMG Desc</th>
                                            <th style={{ width: "11%" }}>Dificuldade</th>
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
                                                </tr>
                                                : questions.map(item => {
                                                    return (
                                                        <tr key={item.id}>
                                                            <th key={item.id} scope="row">{item.id}</th>
                                                            <td>{item.question}</td>
                                                            <td className="td">{item.img}</td>
                                                            <td className="td">{item.imgAlt}</td>
                                                            <td className="td">{item.difficulty}</td>
                                                            <td className="td">{item.rightAnswer}</td>
                                                            <td className="td">{item.distractionAnswer1}</td>
                                                            <td className="td">{item.distractionAnswer2}</td>
                                                            <td className="td">{item.distractionAnswer3}</td>
                                                            <td className="td"><Button onClick={(e) => { EditarRef.current.editar(e.target.value) }} value={JSON.stringify(item)} color="warning">Editar</Button>{' '}
                                                                <Button onClick={(e) => RemoverRef.current.remover(e.target.value)} value={JSON.stringify(item)} color="danger">Remover</Button></td>
                                                        </tr>
                                                    );
                                                })
                                        }
                                        <tr key={'last'}>
                                            <th key={'last'} scope="row"></th>
                                            <td><Input invalid={required} type='textarea' onChange={e => setQuestion(e.target.value)} placeholder="Questão"></Input></td>
                                            <td><Input type='text' onChange={e => setPathImg(e.target.value)} placeholder="Caminho da IMG"></Input></td>
                                            <td><Input type='text' onChange={e => setAltImg(e.target.value)} placeholder="Desc da IMG"></Input></td>
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
                <Editar ref={EditarRef} />
                <Remover ref={RemoverRef} />
            </div>
        </Fragment >

    )
}
