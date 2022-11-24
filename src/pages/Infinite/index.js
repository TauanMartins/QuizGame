import React, { Fragment, useEffect, useState, useRef, useMemo, useContext } from "react";
import { Row, Col, Card, CardTitle, Button, Container, CardBody } from "reactstrap";
import './infinite.css';
import Question from "../../components/Question";
import Timer from "../../components/Timer";
import Endgame from "../../components/Endgame";
import { GlobalState } from "../../components/DataComponents/GlobalState";
import { insertScore, selectAllPaginationEASYRandom, selectAllPaginationHARDRandom, selectAllPaginationMEDIUMRandom, selectAllQtdEASY, selectAllQtdHARD, selectAllQtdMEDIUM } from "../../components/DataComponents/BD";
import { getRandomInt, shuffleArray } from "../../components/DataComponents/RandomInt&ShuffledArray";
import { IoSquare, IoShieldCheckmarkOutline, IoSnow, IoVolumeHigh, IoVolumeMute, IoHeart } from "react-icons/io5";

export default function Infinite() {
    // variáveis globais que percorrem o jogo inteiro e todos seus componentes
    const { currentQuestion, questions, answers, correctAnswer, pontos, setPontos, setOverQuestions,
        setAnswers, name, img, theme, streak, setStreak, distractionAnswer1, distractionAnswer2, power,
        setPower, activate, setActivate, multiplier, setMultiplier, listPowers, setListPowers, overQuestionsGame, setOverQuestionsGame, overQuestions,
        audio, playing, soundEffectW, soundEffectR, setPlaying, alreadyUsed, setAlreadyUsed, setLifes, lifes } = useContext(GlobalState)

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
                setAlreadyUsed([{ easy: [alreadyUsed.easy, currentPage], medium: [alreadyUsed.medium], hard: [alreadyUsed.hard] }])
                var intervaloMin = currentPage * 5;
                var intervaloMax = intervaloMin + 4;
                selectAllPaginationEASYRandom(intervaloMin, intervaloMax, theme).then(response => {
                    if (Object.keys(response.data).length === 0) {
                        return generateQuestion(2)
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
                selectAllPaginationMEDIUMRandom(intervaloMin, intervaloMax, theme).then(response => {
                    if (Object.keys(response.data).length === 0) {
                        return generateQuestion(3)
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
                selectAllPaginationHARDRandom(intervaloMin, intervaloMax, theme).then(response => {
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
        // define valor padrão de pontuação para cada tipo de questão
        let qEasy = 1000;
        let qMedium = 1500;
        let qHard = 2000;

        // ao clicar em uma alternativa ou acabando o tempo os poderes são desativados
        // e o multiplicador volta ao normal de valor 1
        setActivate(false);
        setMultiplier(1);

        // sorteia poderes quando o usuário acertar o streak
        setListPowers(shuffleArray(listPowers))

        // condição que confere se resposta está certa ou errada e faz a soma da pontuação
        if (String(value) === String(correctAnswer)) {
            soundEffectR.play();
            // como ele acertou seta de verde
            document.getElementById(questionNumber).style.backgroundColor = '#218838';

            // faz a somatória da pontuação dependendo do tipo de questão e multiplicador
            if (currentQuestion.difficulty === 'E') {
                setPontos(scoreDisplay + (qEasy * multiplier))
            } else if (currentQuestion.difficulty === 'M') {
                setPontos(scoreDisplay + (qMedium * multiplier))
            } else {
                setPontos(scoreDisplay + (qHard * multiplier))
            }

            // seta +1 p contar o streak
            setStreak(streak + 1);

            // aqui ele vê quantas questões acertou seguidas, irá mudar a cor para laranja.
            if (streak + 1 >= 3) {
                document.getElementById(questionNumber).style.backgroundColor = '#EC9706'
            }

            return nextQuestion();
        } else {
            soundEffectW.play();
            // ao errar uma questão seta de vermelho e chama a função setPontos para chamar a check() posteriormente
            if (power === 'Imune') {
                setPower(undefined);
                return console.log('Tente novamente!')
            }
            setLifes(lifes - 1)
            document.getElementById(questionNumber).style.backgroundColor = '#c82333';
            var operationalPoints = parseFloat(`0.0${getRandomInt(0, 1000)}`);
            setPontos(scoreDisplay + operationalPoints);

            // se ele tinha um streak ativo ele agora seta as questões antes amarelas(indicando streak) para verde
            document.getElementById(questionNumber).style.backgroundColor = '#218838'

            // como ele errou, perde o streak
            setStreak(0)

            return nextQuestion();
        }

    }
    // Chamado ao mudar de questão, confere se há questões suficientes pela frente
    // e se há a necessidade de chamar funções para encerrar o jogo ou acrescentar questões.
    function check(value) {
        //console.log('check')

        // variável que define a questão a frente da próxima. Ex: na lista com 3 questões e estando 
        // respondendo a primeira questão, next_question terá valor de 2, pois a 2 questão é logo após a 1 

        // aqui checa se o usuário ativará o poder ou não.
        if (streak % 3 === 0 && streak !== 0) {
            setActivate(true)
        }

        // condição visa incluir questões médias depois que o jogador responde as 5 questões fáceis
        if ((((questionNumberDisplay === 6) && (questions[questions.length - 1].difficulty === 'E'))) || (questions[questions.length - 1].difficulty === 'E' && value === 'operationGame2')) {
            generateQuestion(2)
        }
        // condição visa incluir questões difíceis depois que o jogador responde as 3 questões médias
        else if (((questionNumberDisplay === 9) && (questions[questions.length - 1].difficulty === 'M')) || (questions[questions.length - 1].difficulty === 'M' && value === 'operationGame2')) {
            generateQuestion(3)
        }
        // se não satisfaz as primeiras condições é capaz que não existam questões que preencham a premissa 5,3,2
        // onde deve ter 5 questões fáceis, 3 médias e 2 difíceis no banco de dados. Condições abaixo visam preencher
        // o jogo com o máximo de questões que achar sobre o tema escolhido. E se não houver o jogo acaba.
        // condição abaixo acabará com o jogo, quando chegar 
        if (lifes === 0 || value === 'operationGame3' || value === 'operationGame4') {
            CounterRef.current.stopTimer();
            return endgame()
        }
    }

    // função chamada após evaluation, limpa lista de respostas, acresce o número da questão, 
    // muda a questão atual restarta o timer fala para o componente filho alterar a questão.
    function nextQuestion() {
        //console.log("nextQuestion");
        setAnswers(['', '']) // seta lista de respostas como vazias para os botões não sumirem
        setQuestionNumber(questionNumberDisplay + 1); // seta questão +=1
        document.getElementById(questionNumber + 1).style.backgroundColor = '#60B4D3' // seta a proxima questão como atual
        CounterRef.current.restartTimer(); // restart timer
        QuestionRef.current.nextQuestion(); // diz para componente filho alterar questão
    }

    // função chamada no endgame, insere os dados do jogador no bd, e espera 500 ms para 
    // ao registrar no bd ser visualizado logo em seguida no modal que abrirá na chamada da função.
    function endgame() {
        //console.log("endgame")
        // chama modal com score e única opção é voltando para tela principal
        insertScore({ name: name, score: scoreDisplay })
        setTimeout(() => EndgameRef.current.endgame(questionNumberDisplay), 500)
    }

    // effect que ao carregar o jogo chama as questões fáceis para compor o jogo
    useEffect(() => {
        generateQuestion(1)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        playing ? audio.play() : audio.pause();
        // eslint-disable-next-line
    }, [playing])

    useEffect(() => {
        console.log(alreadyUsed)
        // eslint-disable-next-line
    }, [alreadyUsed])

    // effect que após o jogador responder uma pergunta irá ser chamado para verificar
    // se precisa chamar questões Médias ou Difíceis ou ainda acabar o jogo.
    useEffect(() => {
        if (pontos !== 0 && questions.length > 0) {
            if (overQuestionsGame) {
                setOverQuestionsGame(false)
                generateQuestion(1)
            } else if (overQuestions) {
                setOverQuestions(false)
                return check('operationGame2')
            }
            check()
        }
        // eslint-disable-next-line
    }, [pontos])

    useEffect(() => {
        if (power === 'Hide1') {
            document.getElementById(String(distractionAnswer1) + 'Answer').style.display = 'none';
            setActivate(false);
            setPower(undefined);
        } else if (power === 'Hide2') {
            document.getElementById(String(distractionAnswer1) + 'Answer').style.display = 'none';
            document.getElementById(String(distractionAnswer2) + 'Answer').style.display = 'none';
            setActivate(false);
            setPower(undefined);
        } else if (power === '2x') {
            setMultiplier(2);
            setActivate(false);
            setPower(undefined);
        } else if (power === '3x') {
            setMultiplier(3);
            setActivate(false);
            setPower(undefined);
        } else if (power === 'Freeze') {
            CounterRef.current.freeze();
            setActivate(false);
            setPower(undefined);
        }
        // eslint-disable-next-line
    }, [power])


    return (
        <Fragment>
            <div className="Infinite">
                <Container fluid>
                    <Card>
                        <CardTitle>
                            <Col>
                                <Row>
                                    <Col  >
                                        <Row className="d-flex justify-content-center align-items-center">
                                            <b>Questão {questionNumberDisplay}</b>
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
                                            <Col className="qNumberF" id={`${questionNumberDisplay}`}><b>{`${questionNumberDisplay}`}</b></Col>
                                            <Col className="qNumber" id={`${questionNumberDisplay + 1}`}><b>{`${questionNumberDisplay + 1}`}</b></Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </CardTitle>
                        <hr />
                        <CardBody>
                            <Col>
                                <Row className="d-flex justify-content-center align-items-center">
                                    <Question ref={QuestionRef} />
                                </Row>
                                <Row className="d-flex justify-content-center align-items-center">
                                    {img === null || img === undefined ? '' :
                                        <img className='img' id="img" alt={`${currentQuestion.img}`} src={img} />}
                                </Row>
                                <Row className="AllPowers">
                                    {

                                        activate === true ?
                                            <>
                                                {(listPowers[0] === 1 || listPowers[1] === 1) || (listPowers[0] === 5 && listPowers[1] === 4) || (listPowers[0] === 4 && listPowers[1] === 5) ?
                                                    <Col>
                                                        <Row className="flex-end justify-content-center align-items-center">
                                                            <Button outline color='warning' onClick={() => setPower('Hide1')}>
                                                                <Col>
                                                                    <Row className="d-flex justify-content-center align-items-center">
                                                                        <b>Hide</b>
                                                                    </Row>
                                                                    <Row className="flex-end justify-content-center align-items-center powerIcon">
                                                                        <Col >
                                                                            <Row>
                                                                                <Row>
                                                                                    <Col>
                                                                                        <IoSquare color="blue" />
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row>
                                                                                    <Col>
                                                                                        {''}
                                                                                    </Col>
                                                                                </Row>
                                                                            </Row>
                                                                            <Row>
                                                                                <Row>
                                                                                    <Col>
                                                                                        <IoSquare />
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row>
                                                                                    <Col>
                                                                                        <IoSquare color="red" />
                                                                                    </Col>
                                                                                </Row>
                                                                            </Row>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Button>
                                                        </Row>
                                                    </Col>
                                                    : ''
                                                }
                                                {((listPowers[0] === 2 || listPowers[1] === 2) && !(listPowers[0] === 1 || listPowers[1] === 1)) ?
                                                    answers.length > 2 ?
                                                        <Col>
                                                            <Row className="d-flex justify-content-center align-items-center">
                                                                <Button outline color='warning' onClick={() => setPower('Hide2')}>
                                                                    <Col>
                                                                        <Row className="d-flex justify-content-center align-items-center">
                                                                            <b>Hide</b>
                                                                        </Row>
                                                                        <Row className="d-flex justify-content-center align-items-center powerIcon">
                                                                            <Col >
                                                                                <Row>
                                                                                    <Row>
                                                                                        <Col>
                                                                                            <IoSquare color='blue' />
                                                                                        </Col>
                                                                                    </Row>
                                                                                    <Row>
                                                                                        <Col>
                                                                                            <IoSquare color='white' />
                                                                                        </Col>
                                                                                    </Row>
                                                                                </Row>
                                                                                <Row>
                                                                                    <Row>
                                                                                        <Col>
                                                                                            <IoSquare color='white' />
                                                                                        </Col>
                                                                                    </Row>
                                                                                    <Row>
                                                                                        <Col>
                                                                                            <IoSquare color='red' />
                                                                                        </Col>
                                                                                    </Row>
                                                                                </Row>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                </Button>
                                                            </Row>
                                                        </Col>
                                                        : ''
                                                    : ''
                                                }
                                                {(listPowers[0] === 3 || listPowers[1] === 3) || ((listPowers[0] === 4 && listPowers[1] === 2) && answers.length <= 2) || ((listPowers[0] === 2 && listPowers[1] === 4) && answers.length <= 2)
                                                    || (((listPowers[0] === 5 && listPowers[1] === 2) && answers.length <= 2) || ((listPowers[0] === 2 && listPowers[1] === 5) && answers.length <= 2))
                                                    || (((listPowers[0] === 6 && listPowers[1] === 2) && answers.length <= 2) || ((listPowers[0] === 2 && listPowers[1] === 6) && answers.length <= 2)) ?
                                                    <Col>
                                                        <Row className="d-flex justify-content-center align-items-center">
                                                            < Button outline color='info' onClick={() => { setActivate(false); setPower('Imune') }}>
                                                                <Col>
                                                                    <Row>
                                                                        <Col>
                                                                            <Row>
                                                                                <b>Imune</b>
                                                                            </Row>
                                                                        </Col>
                                                                        <Col>
                                                                            <IoShieldCheckmarkOutline />
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Button>
                                                        </Row>
                                                    </Col>
                                                    : ''}
                                                {(listPowers[0] === 4 || listPowers[1] === 4) || (listPowers[0] === 1 && listPowers[1] === 2) || (listPowers[0] === 2 && listPowers[1] === 1) ||
                                                    (((listPowers[0] === 3 && listPowers[1] === 2) && answers.length <= 2) || ((listPowers[0] === 2 && listPowers[1] === 3) && answers.length <= 2)) ?
                                                    <Col>
                                                        <Row className="d-flex justify-content-center align-items-center">
                                                            <Button outline color='danger' onClick={() => setPower('2x')}><b>2x Points</b></Button>
                                                        </Row>
                                                    </Col>
                                                    : ''}
                                                {(listPowers[0] === 5 || listPowers[1] === 5) && !(listPowers[0] === 4 || listPowers[1] === 4) ?
                                                    <Col>
                                                        <Row className="d-flex justify-content-center align-items-center">
                                                            <Button outline color='danger' onClick={() => setPower('3x')}><b>3x Points</b></Button>
                                                        </Row>
                                                    </Col>
                                                    : ''}
                                                {(listPowers[0] === 6 || listPowers[1] === 6) ?
                                                    <Col>
                                                        <Row className="d-flex justify-content-center align-items-center">
                                                            <Button outline color='info' onClick={() => setPower('Freeze')}>
                                                                <Col>
                                                                    <Row>
                                                                        <Col>
                                                                            <Row>
                                                                                <b>Freeze</b>
                                                                            </Row>
                                                                        </Col>
                                                                        <Col>
                                                                            <IoSnow />
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Button>
                                                        </Row>
                                                    </Col>
                                                    : ''}
                                            </>
                                            : ''
                                    }
                                </Row>
                                <Row style={{width: '50%', margin: 'auto'}}>
                                    <Col>
                                        <Row>
                                            {playing ?
                                                <IoVolumeHigh size={40} onClick={() => { setPlaying(false); audio.pause() }} /> :
                                                <IoVolumeMute size={40} onClick={() => { setPlaying(true); audio.play() }} />
                                            }
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row style={{ justifyContent: 'flex-end' }}>
                                            {lifes === 3 ?
                                                <>
                                                    <IoHeart size={50} color='red' />
                                                    <IoHeart size={50} color='red' />
                                                    <IoHeart size={50} color='red' />
                                                </>
                                                : lifes === 2 ?
                                                    <>
                                                        <IoHeart size={50} color='red' />
                                                        <IoHeart size={50} color='red' />
                                                    </>
                                                    : lifes === 1 ?
                                                        <IoHeart size={50} color='red' /> : ''
                                            }
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </CardBody>
                    </Card>
                    {
                        answers === undefined ? '' : answers.length === 0 ? '' :
                            <Container fluid>
                                <Row >
                                    <Col>
                                        <Row >
                                            <Button onClick={e => { evaluator(e.target.value); }} id={String(answers[0]) + 'Answer'} value={answers[0]} key={answers[0]} className="Button" color="primary" >
                                                {answers[0]}
                                            </Button>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Button onClick={e => { evaluator(e.target.value); }} id={String(answers[1]) + 'Answer'} value={answers[1]} key={answers[1]} className="Button" color="success" >
                                                {answers[1]}
                                            </Button>
                                        </Row>
                                    </Col>
                                </Row>
                                {answers === undefined ? '' : answers.length === 2 ? '' :
                                    <Row >
                                        <Col>
                                            <Row>
                                                <Button onClick={e => { evaluator(e.target.value); }} id={String(answers[2]) + 'Answer'} value={answers[2]} key={answers[2]} className="Button" color="warning" >
                                                    {answers[2]}
                                                </Button>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Button onClick={e => { evaluator(e.target.value); }} id={String(answers[3]) + 'Answer'} value={answers[3]} key={answers[3]} className="Button" color="danger" >
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

