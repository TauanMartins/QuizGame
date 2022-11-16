import React, { Fragment, useEffect, useState, useRef, useMemo, useContext } from "react";
import { Row, Col, Card, CardTitle, Button, Container, CardBody } from "reactstrap";
import './game.css';
import Question from "../../components/Question";
import Timer from "../../components/Timer";
import Endgame from "../../components/Endgame";
import { GlobalState } from "../../components/DataComponents/GlobalState";
import { insertScore, selectAllPaginationEASY, selectAllPaginationHARD, selectAllPaginationMEDIUM, selectAllQtdEASY, selectAllQtdHARD, selectAllQtdMEDIUM } from "../../components/DataComponents/BD";
import { getRandomInt, shuffleArray } from "../../components/DataComponents/RandomInt&ShuffledArray";

export default function Game() {
    const { currentQuestion, questions, answers, correctAnswer, pontos, setPontos, setAnswers, name, img, theme } = useContext(GlobalState)
    const [questionNumber, setQuestionNumber] = useState(1);
    const CounterRef = useRef(null);
    const QuestionRef = useRef(null);
    const EndgameRef = useRef(null);

    function timeOut() {
        return check('operationGame1');
    }

    function generateQuestion(cond) {
        if (cond === 1) {
            if (theme && (theme[0] !== '1' && theme.length > 0)) {
                return selectAllQtdEASY(theme).then(response => {
                    var totalRows = response.count;
                    var totalPages = Math.floor(totalRows / 5);
                    var currentPage = getRandomInt(0, totalPages === 0 ? 0 : totalPages - 1);
                    var intervaloMin = currentPage * 5;
                    var intervaloMax = intervaloMin + 4;
                    selectAllPaginationEASY(intervaloMin, intervaloMax, theme).then(response => {
                        if (Object.keys(response.data).length === 0) {
                            return check('operationGame')
                        } else {
                            return QuestionRef.current.setList(shuffleArray(response.data))
                        }
                    })

                })
            } else {
                return selectAllQtdEASY().then(response => {
                    var totalRows = response.count;
                    var totalPages = Math.floor(totalRows / 5);
                    var currentPage = getRandomInt(0, totalPages === 0 ? 0 : totalPages - 1);
                    var intervaloMin = currentPage * 5;
                    var intervaloMax = intervaloMin + 4;
                    selectAllPaginationEASY(intervaloMin, intervaloMax).then(response => {
                        if (Object.keys(response.data).length === 0) {
                            return check('operationGame')
                        } else {
                            return QuestionRef.current.setList(shuffleArray(response.data))
                        }
                    })
                })
            }
        }
        if (cond === 2) {
            if (theme && (theme[0] !== '1' && theme.length > 0)) {
                return selectAllQtdMEDIUM(theme).then(response => {
                    var totalRows = response.count;
                    var totalPages = Math.floor(totalRows / 3);
                    var currentPage = getRandomInt(0, totalPages === 0 ? 0 : totalPages - 1);
                    var intervaloMin = currentPage * 3;
                    var intervaloMax = intervaloMin + 2;
                    selectAllPaginationMEDIUM(intervaloMin, intervaloMax, theme).then(response => {
                        console.log('aqui')
                        if (Object.keys(response.data).length === 0) {
                            return check('operationGame')
                        } else {
                            return QuestionRef.current.setList(shuffleArray(response.data))
                        }
                    })
                })
            } else {
                return selectAllQtdMEDIUM().then(response => {
                    var totalRows = response.count;
                    var totalPages = Math.floor(totalRows / 3);
                    var currentPage = getRandomInt(0, totalPages === 0 ? 0 : totalPages - 1);
                    var intervaloMin = currentPage * 3;
                    var intervaloMax = intervaloMin + 2;
                    selectAllPaginationMEDIUM(intervaloMin, intervaloMax).then(response => {
                        if (Object.keys(response.data).length === 0) {
                            return check('operationGame')
                        } else {
                            return QuestionRef.current.setList(shuffleArray(response.data))
                        }
                    })
                })
            }
        }
        if (cond === 3) {
            if (theme && (theme[0] !== '1' && theme.length > 0)) {
                return selectAllQtdHARD(theme).then(response => {
                    var totalRows = response.count;
                    var totalPages = Math.floor(totalRows / 2);
                    var currentPage = getRandomInt(0, totalPages === 0 ? 0 : totalPages - 1);
                    var intervaloMin = currentPage * 2;
                    var intervaloMax = intervaloMin + 1;
                    selectAllPaginationHARD(intervaloMin, intervaloMax, theme).then(response => {
                        console.log('aqui2')
                        if (Object.keys(response.data).length === 0) {
                            return check('operationGame')
                        } else {
                            return QuestionRef.current.setList(shuffleArray(response.data))
                        }
                    })
                })
            } else {
                return selectAllQtdHARD().then(response => {
                    var totalRows = response.count;
                    var totalPages = Math.floor(totalRows / 2);
                    var currentPage = getRandomInt(0, totalPages === 0 ? 0 : totalPages - 1);
                    var intervaloMin = currentPage * 2;
                    var intervaloMax = intervaloMin + 1;
                    selectAllPaginationHARD(intervaloMin, intervaloMax).then(response => {
                        if (Object.keys(response.data).length === 0) {
                            return check('operationGame')
                        } else {
                            return QuestionRef.current.setList(shuffleArray(response.data))
                        }
                    })
                })
            }
        }
    }

    function evaluator(value) {
        if (value === 'operationGame') {
            return scoreDisplay;
        }
        if (String(value) === String(correctAnswer)) {
            document.getElementById(questionNumber).style.backgroundColor = '#218838'
            let points = scoreDisplay + 1
            setPontos(points)
            return points;
        } else {
            document.getElementById(questionNumber).style.backgroundColor = '#c82333';
            return scoreDisplay;
        }
    }

    function check(value) {
        console.log("respostas: ", answers)
        var next_question = questions.indexOf(currentQuestion, 0) + 1;
        console.log(next_question)
        console.log(value)
        // confere se respondeu certo
        var point;
        if (value) {
            point = evaluator(value)
        }
        if (((questionNumberDisplay === 5 ||
            (Object.keys(questions).length === next_question))
            && (questions[questions.length - 1].difficulty === 'E'))
            && value !== 'operationGame') {
            generateQuestion(2)
        }
        if (((questionNumberDisplay === 9 ||
            (Object.keys(questions).length === next_question))
            && (questions[questions.length - 1].difficulty === 'M'))
            && value !== 'operationGame') {
            generateQuestion(3)
        }
        if (questionNumberDisplay === 10 ||
            value === 'operationGame') {
            CounterRef.current.stopTimer();
            return endgame(point)
        } else {
            return nextQuestion();
        }
    }

    function nextQuestion() {
        console.log("nextQuestion");
        setAnswers([])
        setQuestionNumber(questionNumberDisplay + 1); // seta questão +=1
        CounterRef.current.restartTimer(); // restart timer
        QuestionRef.current.nextQuestion(); // diz para componente filho alterar questão
    }

    function endgame(point) {
        console.log("endgame")
        // chama modal com score e única opção é voltando para tela principal
        insertScore({ name: name, score: point })
        setTimeout(() => EndgameRef.current.endgame(), 500)
    }

    useEffect(() => {
        generateQuestion(1)
        // eslint-disable-next-line
    }, [])

    const questionNumberDisplay = useMemo(() => questionNumber, [questionNumber])
    const scoreDisplay = useMemo(() => pontos, [pontos])

    return (
        <Fragment>
            <div className="Game">
                <Container fluid>
                    
                    <Card>
                        <CardTitle>
                            <Col>
                                <Row>
                                    <Col  >
                                        <Row className="d-flex justify-content-center align-items-center">
                                            <b>Questão {questionNumberDisplay}/10</b>
                                        </Row>
                                    </Col>
                                    <Col className="middleText" >
                                        <Row className="d-flex justify-content-center align-items-center">
                                            <b>Score: {scoreDisplay}</b>
                                        </Row>
                                    </Col>
                                    <Col >
                                        <Row className="d-flex justify-content-center align-items-center">
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
                            {img === null || img === undefined ? '' :
                                <img className='img' id="img" alt={`${currentQuestion.img}`} src={img} />}
                        </CardBody>
                    </Card>

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
                </Container>
            </div >
            <Endgame ref={EndgameRef} />
        </Fragment >

    )
}

