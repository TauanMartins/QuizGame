import React, { Fragment, useEffect, useState, useRef, useMemo, useContext } from "react";
import { Row, Col, Card, CardTitle, Button, Container, CardBody } from "reactstrap";
import './game.css';

import Question from "../../components/Question";

import Timer from "../../components/Timer";
import Endgame from "../../components/Endgame";
import { GlobalState } from "../../components/DataComponents/GlobalState";
import { insertScore, selectAllPaginationEASY, selectAllPaginationHARD, selectAllPaginationMEDIUM, selectAllQtdEASY, selectAllQtdHARD, selectAllQtdMEDIUM } from "../../components/DataComponents/BD";
import { getRandomInt } from "../../components/DataComponents/RandomInt&ShuffledArray";

export default function Game() {
    const { currentQuestion, answers, correctAnswer, pontos, setPontos, setAnswers, name } = useContext(GlobalState)
    const [questionNumber, setQuestionNumber] = useState(1);

    const CounterRef = useRef(null);
    const QuestionRef = useRef(null);
    const EndgameRef = useRef(null);

    function timeOut() {
        console.log("timeOut")
        return check(0);
    }

    function generateQuestion(cond) {
        if (cond === 1) {
            return selectAllQtdEASY().then(response => {
                var totalRows = response.count;
                var totalPages = Math.floor(totalRows / 5);
                var currentPage = getRandomInt(0, totalPages - 1);
                var intervaloMin = currentPage * 5;
                var intervaloMax = intervaloMin + 4;
                selectAllPaginationEASY(intervaloMin, intervaloMax).then(response => {
                    //console.log(response.data)
                    if (response.error === null) {
                        return QuestionRef.current.setList(response.data)
                    }
                })
            })
        }
        if (cond === 2) {
            return selectAllQtdMEDIUM().then(response => {
                var totalRows = response.count;
                var totalPages = Math.floor(totalRows / 3);
                var currentPage = getRandomInt(0, totalPages - 1);
                var intervaloMin = currentPage * 3;
                var intervaloMax = intervaloMin + 2;
                selectAllPaginationMEDIUM(intervaloMin, intervaloMax).then(response => {
                    //console.log(response.data)
                    if (response.error === null) {
                        return QuestionRef.current.setList(response.data)
                    }
                })
            })
        }
        if (cond === 3) {
            return selectAllQtdHARD().then(response => {
                var totalRows = response.count;
                var totalPages = Math.floor(totalRows / 2);
                var currentPage = getRandomInt(0, totalPages - 1);
                var intervaloMin = currentPage * 2;
                var intervaloMax = intervaloMin + 1;
                selectAllPaginationHARD(intervaloMin, intervaloMax).then(response => {
                    //console.log(response.data)
                    if (response.error === null) {
                        return QuestionRef.current.setList(response.data)
                    }
                })
            })
        }
    }

    function evaluator(value) {
        if (String(value) === String(correctAnswer)) {
            document.getElementById(questionNumber).style.backgroundColor = '#218838'
            return setPontos(scoreDisplay + 1)
        } else {
            document.getElementById(questionNumber).style.backgroundColor = '#c82333'
        }
    }

    function check(value) {
        console.log("respostas: ", answers)
        // confere se respondeu certo
        if (value) {
            evaluator(value)
        }
        if (questionNumberDisplay === 5) {
            generateQuestion(2)
        }
        if (questionNumberDisplay === 8) {
            generateQuestion(3)
        }
        if (questionNumberDisplay === 10) {
            CounterRef.current.stopTimer();
            return endgame()
        } else {
            return nextQuestion();
        }
    }

    function nextQuestion() {
        console.log("nextQuestion");
        // document.getElementById('img').src = loading; // muda p img de carregando
        setAnswers([])
        setQuestionNumber(questionNumberDisplay + 1); // seta questão +=1
        CounterRef.current.restartTimer(); // restart timer
        QuestionRef.current.nextQuestion(); // diz para componente filho alterar questão
    }

    function endgame() {
        console.log("endgame")
        // chama modal com score e única opção é voltando para tela principal
        insertScore({name: name, score: scoreDisplay})
        setTimeout(EndgameRef.current.endgame(), 5000)
    }

    useEffect(() => {
        console.log("effect")
        // select abaixo bom para fazer o segundo modo de jogo infinito
        // selectAllQtd().then(response => {
        //     var totalRows = response.count;
        //     var totalPages = Math.floor(totalRows / 10);
        //     var currentPage = getRandomInt(0, totalPages - 1);
        //     var intervaloMin = currentPage * 10;
        //     var intervaloMax = intervaloMin + 9;
        //     console.log(totalPages)
        //     console.log(totalRows, intervaloMin, intervaloMax, currentPage)
        //     selectAllPaginationHARD().then(response => {
        //         console.log(response);
        //     })
        // })
        // selectAllPagination(intervaloMin, intervaloMax).then(response => {
        //     console.log(response)
        //     if (response.error === null) {
        //         console.log('entrou')
        //         return QuestionRef.current.setList(response.data)
        //     }
        // })
        generateQuestion(1)
    }, [])

    const questionNumberDisplay = useMemo(() => questionNumber, [questionNumber])
    const scoreDisplay = useMemo(() => pontos, [pontos])

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
                                                        <b>Score: {scoreDisplay}</b>
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
                                    <CardBody>
                                        <Row>
                                            <Col>
                                                <Question ref={QuestionRef} />
                                            </Col>
                                        </Row>
                                        {currentQuestion.img === null || currentQuestion.img === undefined ? '' :
                                            <img className='img' id="img" alt={`${currentQuestion.imgAlt}`} src={currentQuestion.img} />}
                                    </CardBody>
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

