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
    // variáveis globais que percorrem o jogo inteiro e todos seus componentes
    const { currentQuestion, questions, answers, correctAnswer, pontos, setPontos, setAnswers, name, img, theme } = useContext(GlobalState)

    // refs para chamar funções nos componentes filhos
    const CounterRef = useRef(null);
    const QuestionRef = useRef(null);
    const EndgameRef = useRef(null);

    // variável que define o número da questão
    const [questionNumber, setQuestionNumber] = useState(1);

    // variáveis para mostrar na tela
    const questionNumberDisplay = useMemo(() => questionNumber, [questionNumber])
    const scoreDisplay = useMemo(() => Math.floor(pontos), [pontos])

    function timeOut() {
        return evaluator('operationGame1');
    }

    // variável que chama as questões com a quantidade e dificuldade certa, é onde possui a
    // lógica de variabilidade e sempre trará questões que satisfaçam as condições estabelecidas
    // no intervalo max e min. A lógica é a seguinte, escolhendo um tema jogos por exemplo, no início
    // do jogo isso retornará primeiro a quantidade de questões do tema jogo na dificuldade fácil, supondo
    // que tenha 3 questões, isso resulta em apenas 1 página, pois trabalhamos aqui com a premissa de sempre
    // ter 5 questões fáceis, isso resultará na variável totalPages o valor 0, na current page resultará
    // o valor 0 também (nessa variável o programa escolhe um valor aleatório entre 0 e o número max de pags),
    // o intervalo mínimo é a página escolhida (0) * 5, retornando 0 e o máximo será +4, o intervalo será 0-4.
    function generateQuestion(cond) {
        if (cond === 1) {
            return selectAllQtdEASY(theme).then(response => {
                var totalRows = response.count;
                var totalPages = Math.floor(totalRows / 5);
                var currentPage = getRandomInt(0, totalPages === 0 ? 0 : totalPages - 1);
                var intervaloMin = currentPage * 5;
                var intervaloMax = intervaloMin + 4;
                selectAllPaginationEASY(intervaloMin, intervaloMax, theme).then(response => {
                    if (Object.keys(response.data).length === 0) {
                        return check('operationGame1')
                    } else {
                        return QuestionRef.current.setList(shuffleArray(response.data))
                    }
                })
            })
        }
        if (cond === 2) {
            return selectAllQtdMEDIUM(theme).then(response => {
                var totalRows = response.count;
                var totalPages = Math.floor(totalRows / 3);
                var currentPage = getRandomInt(0, totalPages === 0 ? 0 : totalPages - 1);
                var intervaloMin = currentPage * 3;
                var intervaloMax = intervaloMin + 2;
                selectAllPaginationMEDIUM(intervaloMin, intervaloMax, theme).then(response => {
                    if (Object.keys(response.data).length === 0) {
                        return check('operationGame2')
                    } else {
                        return QuestionRef.current.setList(shuffleArray(response.data))
                    }
                })
            })

        }
        if (cond === 3) {
            return selectAllQtdHARD(theme).then(response => {
                var totalRows = response.count;
                var totalPages = Math.floor(totalRows / 2);
                var currentPage = getRandomInt(0, totalPages === 0 ? 0 : totalPages - 1);
                var intervaloMin = currentPage * 2;
                var intervaloMax = intervaloMin + 1;
                selectAllPaginationHARD(intervaloMin, intervaloMax, theme).then(response => {
                    if (Object.keys(response.data).length === 0) {
                        return check('operationGame3')
                    } else {
                        return QuestionRef.current.setList(shuffleArray(response.data))
                    }
                })
            })
        }
    }


    // função chamada após usuário clicar em uma resposta ou o tempo acabar, acresce 
    // ou permanece a pontuação caso acerte ou erre e chama a nextQuestion().
    function evaluator(value) {
        console.log('evaluator')
        if (String(value) === String(correctAnswer)) {
            document.getElementById(questionNumber).style.backgroundColor = '#218838';
            setPontos(scoreDisplay + 1)
            return nextQuestion();
        } else {
            document.getElementById(questionNumber).style.backgroundColor = '#c82333';
            var operationalPoints = parseFloat(`0.0${getRandomInt(0, 1000)}`);
            setPontos(scoreDisplay + operationalPoints);
            return nextQuestion();
        }

    }
    // Chamado ao mudar de questão, confere se há questões suficientes pela frente
    // e se há a necessidade de chamar funções para encerrar o jogo ou acrescentar questões.
    function check(value) {
        console.log('check')
        // console.log("respostas: ", answers)

        // variável que define a questão a frente da próxima. Ex: na lista com 3 questões e estando 
        // respondendo a primeira questão, next_question terá valor de 2, pois a 2 questão é logo após a 1 
        var next_question = questions.indexOf(currentQuestion, 0) + 2;

        // condição visa incluir questões médias depois que o jogador responde as 5 questões fáceis
        if (((questionNumberDisplay === 6) && (questions[questions.length - 1].difficulty === 'E'))) {
            generateQuestion(2)
        }
        // condição visa incluir questões difíceis depois que o jogador responde as 3 questões médias
        else if (((questionNumberDisplay === 9) && (questions[questions.length - 1].difficulty === 'M'))) {
            generateQuestion(3)
        }
        // se não satisfaz as primeiras condições é capaz que não existam questões que preencham a premissa 5,3,2
        // onde deve ter 5 questões fáceis, 3 médias e 2 difíceis no banco de dados. Condições abaixo visam preencher
        // o jogo com o máximo de questões que achar sobre o tema escolhido. E se não houver o jogo acaba.
        else if ((questions[questions.length - 1].difficulty === 'E' && questions.length < 5 && questionNumberDisplay >= next_question) ||
            (questions[questions.length - 1].difficulty === 'M' && questions.length < 3 && questionNumberDisplay >= next_question) ||
            (questions[questions.length - 1].difficulty === 'D' && questions.length < 2 && questionNumberDisplay >= next_question)) {
            if (currentQuestion.difficulty === 'E' && value === undefined) {
                return generateQuestion(2)
            } else if ((currentQuestion.difficulty === 'M'||currentQuestion.difficulty === 'E') && value !== 'operationGame3') {
                return generateQuestion(3)
            }
        }
        // condição abaixo acabará com o jogo, quando chegar 
        if (questionNumberDisplay === 11 || value === 'operationGame3' || value === 'operationGame2' ||
            (currentQuestion.difficulty === 'H' && questions.length < 2)) {
            CounterRef.current.stopTimer();
            endgame()
        }
    }

    // função chamada após evaluation, limpa lista de respostas, acresce o número da questão, 
    // muda a questão atual restarta o timer fala para o componente filho alterar a questão.
    function nextQuestion() {
        console.log("nextQuestion");
        setAnswers(['', '', '', '']) // seta lista de respostas como vazias para os botões não sumirem
        setQuestionNumber(questionNumberDisplay + 1); // seta questão +=1
        document.getElementById(questionNumber + 1 === 11 ? 10 : questionNumber + 1).style.backgroundColor = 'orange' // seta a proxima questão como atual
        CounterRef.current.restartTimer(); // restart timer
        QuestionRef.current.nextQuestion(); // diz para componente filho alterar questão
    }

    // função chamada no endgame, insere os dados do jogador no bd, e espera 500 ms para 
    // ao registrar no bd ser visualizado logo em seguida no modal que abrirá na chamada da função.
    function endgame() {
        console.log("endgame")
        // chama modal com score e única opção é voltando para tela principal
        insertScore({ name: name, score: scoreDisplay })
        setTimeout(() => EndgameRef.current.endgame(), 500)
    }

    // effect que ao carregar o jogo chama as questões fáceis para compor o jogo
    useEffect(() => {
        generateQuestion(1)
        // eslint-disable-next-line
    }, [])

    // effect que após o jogador responder uma pergunta irá ser chamado para verificar
    // se precisa chamar questões Médias ou Difíceis ou ainda acabar o jogo.
    useEffect(() => {
        if (pontos !== 0 && questions.length > 0) {
            check()
        }
        // eslint-disable-next-line
    }, [pontos])



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
                                            <b>Questão {questionNumberDisplay === 11 ? 10 : questionNumberDisplay}/10</b>
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
                                            <Col className="qNumberF" id="1"><b>1</b></Col>
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
                                            <Button onClick={e => { evaluator(e.target.value); }} value={answers[0]} key={answers[0]} className="Button" color="primary" >
                                                {answers[0]}
                                            </Button>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Button onClick={e => { evaluator(e.target.value); }} value={answers[1]} key={answers[1]} className="Button" color="success" >
                                                {answers[1]}
                                            </Button>
                                        </Row>
                                    </Col>
                                </Row>
                                {answers === undefined ? '' : answers.length === 2 ? '' :
                                    <Row >
                                        <Col>
                                            <Row>
                                                <Button onClick={e => { evaluator(e.target.value); }} value={answers[2]} key={answers[2]} className="Button" color="warning" >
                                                    {answers[2]}
                                                </Button>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Button onClick={e => { evaluator(e.target.value); }} value={answers[3]} key={answers[3]} className="Button" color="danger" >
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

