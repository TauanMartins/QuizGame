import React, { Fragment, useEffect, useState, useRef, useMemo, useContext } from "react";
import { Row, Col, Card, CardTitle, CardText, Button, Label, Container } from "reactstrap";
import './game.css';

import Question from "../../components/Question";
import { getRandomInt } from "../../components/DataComponents/RandomInt&ShuffledArray";

import Timer from "../../components/Timer";
import api from "../../services/api";
import loading from "../../assets/loading.gif";
import Endgame from "../../components/Endgame";
import { GlobalState } from "../../components/DataComponents/GlobalState";

export default function Game() {


    const { selectedPlayer, selectedPlayerIMG, answers, correctAnswer } = useContext(GlobalState)
    const [questionNumber, setQuestionNumber] = useState(1);

    const [score, setScore] = useState(0);

    const totalPages = 811;
    const currentPage = getRandomInt(1, totalPages)

    const CounterRef = useRef(null);
    const QuestionRef = useRef(null);
    const EndgameRef = useRef(null);

    async function getPlayers() {
        const response = await api.get("api/players", {
            params: {
                page: currentPage
            }
        });
        const json = await response.data.items;
        QuestionRef.current.setList(json);

    }

    function timeOut() {
        console.log("timeOut")
        return check(0);
    }

    function evaluator(value) {
        if (String(value) === String(correctAnswer)) {
            document.getElementById(questionNumber).style.backgroundColor = '#218838'
            return setScore(scoreDisplay + 1)
        } else {
            document.getElementById(questionNumber).style.backgroundColor = '#c82333'
        }
    }

    function check(value) {
        // confere se respondeu certo
        evaluator(value)
        // if comparando se questão é igual a 10, se sim entra, se n entra no else
        if (questionNumber === 10) {
            CounterRef.current.stopTimer();
            return endgame()
        } else {
            return nextQuestion();
        }
    }

    function nextQuestion() {
        console.log("nextQuestion");
        document.getElementById('img').src = loading; // muda p img de carregando
        setQuestionNumber(questionNumberDisplay + 1); // seta questão +=1
        QuestionRef.current.nextQuestion(); // diz para componente filho alterar questão
        CounterRef.current.restartTimer(); // restart timer
    }

    function endgame() {
        console.log("endgame")
        // chama modal com score e única opção é voltando para tela principal
        EndgameRef.current.endgame(scoreDisplay)
    }
    useEffect(() => {
        console.log("effect")

        getPlayers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const questionNumberDisplay = useMemo(() => questionNumber, [questionNumber])
    const scoreDisplay = useMemo(() => score, [score])

    return (

        <Fragment>
            <div className="Game">

                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <Card>
                                    <CardTitle>
                                        <Col>
                                            <Row>
                                                <Col className="d-flex justify-content-center align-items-center" >
                                                    <Row>
                                                        <b>Questão {questionNumberDisplay}/10</b>
                                                    </Row>
                                                </Col>
                                                <Col className="d-flex justify-content-center align-items-center middleText">
                                                    <Row>
                                                        <b>Score: {score}</b>
                                                    </Row>
                                                </Col>
                                                <Col className="d-flex justify-content-center align-items-center">
                                                    <Row>
                                                        <Timer timeOut={timeOut} ref={CounterRef} />
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row className="AllQuestions" >
                                                <Col className=" justify-content-center ">
                                                    <Row >
                                                        <Col className="qNumber" id="1"><b>1</b></Col>
                                                        <Col className="qNumber" id="2"><b>2</b></Col>
                                                        <Col className="qNumber" id="3"><b>3</b></Col>
                                                        <Col className="qNumber" id="4"><b>4</b></Col>
                                                        <Col className="qNumber" id="5"><b>5</b></Col>
                                                    </Row>
                                                    <Row >
                                                        <Col className="qNumber" id="6"><b>6</b></Col>
                                                        <Col className="qNumber" id="7"><b>7</b></Col>
                                                        <Col className="qNumber" id="8"><b>8</b></Col>
                                                        <Col className="qNumber" id="9"><b>9</b></Col>
                                                        <Col className="qNumber" id="10"><b>10</b></Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </CardTitle>
                                    <CardText>
                                        <Row>
                                            <Col>
                                                <Label>
                                                    <b>Sobre o jogador {selectedPlayer === undefined ? '' : selectedPlayer.name} </b>
                                                </Label>
                                            </Col>
                                        </Row>
                                        <img className='img' id="img" alt={`Jogador ${selectedPlayer === undefined ? '' : selectedPlayer.name}`}
                                            src={selectedPlayerIMG === undefined ? loading : selectedPlayerIMG} />
                                        <Row>
                                            <Col>
                                                <Question ref={QuestionRef} />
                                                <br />
                                            </Col>
                                        </Row>
                                    </CardText>
                                </Card>
                            </Col>
                        </Row>
                        {
                            answers === undefined ? '' : answers.length === 0 ? '' :
                                <Container fluid>
                                    <Row >
                                        <Col>
                                            <Row >
                                                <Button onClick={e => { check(e.target.value); }} value={answers[0]} key={answers[0]} className="Button" color="primary" >
                                                    {answers[0]}
                                                </Button>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Button onClick={e => { check(e.target.value); }} value={answers[1]} key={answers[1]} className="Button" color="success" >
                                                    {answers[1]}
                                                </Button>
                                            </Row>
                                        </Col>
                                    </Row>
                                    {answers === undefined ? '' : answers.length === 2 ? '' :
                                        <Row >
                                            <Col>
                                                <Row>
                                                    <Button onClick={e => { check(e.target.value); }} value={answers[2]} key={answers[2]} className="Button" color="warning" >
                                                        {answers[2]}
                                                    </Button>
                                                </Row>
                                            </Col>
                                            <Col>
                                                <Row>
                                                    <Button onClick={e => { check(e.target.value); }} value={answers[3]} key={answers[3]} className="Button" color="danger" >
                                                        {answers[3]}
                                                    </Button>
                                                </Row>
                                            </Col>
                                        </Row>
                                    }
                                </Container>
                        }
                    </Col>
                </Row>
            </div >
            <Endgame ref={EndgameRef} />
        </Fragment >

    )
}

