import React, { Fragment, useState, forwardRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Modal, ModalBody, Input, Button, Container, ModalHeader, Label, Row, PopoverBody, Popover } from "reactstrap";
import { GlobalState } from "../DataComponents/GlobalState";
import { selectAllThemes } from "../DataComponents/BD";
import { IoHelpCircleOutline } from "react-icons/io5";
function GameOptions({ a }, ref) {
    // variável para abrir e fechar o modal
    const [abrir, setAbrir] = useState(false);

    // variável para identificar se o jogador preencheu um tema
    const [invalid, setInvalid] = useState({ value: 'true', msg: '', first: true });

    // variáveis para definir opções do jogador
    const { setName, setPontos, setTheme, theme, setActivate, setPower, setMultiplier,
        setStreak, setOverQuestions, setOverQuestionsGame, setPlaying, audio,
        setAlreadyUsedEasy, setAlreadyUsedMedium, setAlreadyUsedHard, setLifes } = useContext(GlobalState)

    // variáveis para apresentar a lista correta ao usuário à 
    // medida que ele for marcando e desmarcando as checkboxes
    const [themeList, setThemeList] = useState(undefined);

    // variável que seta o modo de jogo
    const [gameMode, setGameMode] = useState('2');

    const [isTooltipoOpenHistory, setIsTooltipoOpenHistory] = useState(false);
    function handleTooltipHistory() {
        setIsTooltipoOpenHistory(!isTooltipoOpenHistory);
    }
    const [isTooltipoOpenClassic, setIsTooltipoOpenClassic] = useState(false);
    function handleTooltipClassic() {
        setIsTooltipoOpenClassic(!isTooltipoOpenClassic);
    }
    const [isTooltipoOpenInfinite, setIsTooltipoOpenInfinite] = useState(false);
    function handleTooltipInfinite() {
        setIsTooltipoOpenInfinite(!isTooltipoOpenInfinite);
    }
    // função para abrir o modal
    function handleTooltip() {
        setAbrir(!abrir);
    }

    // função chamada na Home, ao clicar em Jogar irá abrir o modal, e
    // caso o usuário já tenha jogado irá setar para variáveis padrão.
    ref.current = {
        startGameOptions: function () {
            setAbrir(true);
        }
    }

    // ao carregar esse componente a lista com todos os temas será carregada
    useEffect(() => {
        selectAllThemes().then(response => setThemeList(response.data))
        setName('Unknown');
        setTheme([]);
        setPontos(0);
        setActivate(false);
        setPower(undefined);
        setStreak(0);
        setMultiplier(1);
        setOverQuestions(false);
        setOverQuestionsGame(false);
        audio.load()
        setAlreadyUsedEasy([])
        setAlreadyUsedMedium([])
        setAlreadyUsedHard([])
        setLifes(3)
        // eslint-disable-next-line
    }, [])

    // toda vez que o usuário marcar e desmarcar uma opção de tema irá passar
    // por essa condição e verificará se o usuário deixou a lista de tema vazia,
    // mostrando uma mensagem de erro e impedindo o prosseguimento do jogo.
    useEffect(() => {
        if (theme.length === 0 && invalid.first === false) {
            setInvalid({ value: true, msg: 'Selecione um tema!', first: false })
        }
        console.log(theme)
        // eslint-disable-next-line
    }, [theme])


    return (
        <Fragment>
            <div className="Home">
                <Container fluid>
                    <Modal centered isOpen={abrir} className='modal' >
                        <ModalHeader toggle={handleTooltip}>
                            Digite seu nome para fazer parte do HighScore
                        </ModalHeader>
                        <ModalBody >
                            <Col>
                                <Row>
                                    <Label>Nome:</Label>
                                </Row>
                                <Row>
                                    <Input placeholder='Unknown' onChange={e => { if (e === '') { return true } else { return setName(e.target.value) } }} />
                                </Row>
                                <br />
                                <Row>
                                    <Label>Escolha um modo de jogo:</Label>
                                </Row>
                                <Row md={2} xs={2}>
                                    <Col>
                                        <div className="checkbox">
                                            <label>
                                                <input invalid={invalid}
                                                    type="checkbox"
                                                    checked={gameMode === '1' ? true : false}
                                                    value={'1'}
                                                    onChange={(e) => { setGameMode(e.target.value); setTheme([]); setInvalid({ value: false, msg: '', first: false }) }} />
                                                <span>{' História'}
                                                    <IoHelpCircleOutline cursor="pointer" id="history" onMouseEnter={handleTooltipHistory}
                                                        onMouseLeave={handleTooltipHistory} size={20} />
                                                    <Popover placement="right" target={'history'} isOpen={isTooltipoOpenHistory}>
                                                        <PopoverBody>
                                                            {'Neste modo você terá perguntas relacionadas a história de Harry Potter.'}
                                                        </PopoverBody>
                                                    </Popover>
                                                </span>
                                            </label>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="checkbox">
                                            <label>
                                                <input invalid={invalid}
                                                    type="checkbox"
                                                    checked={gameMode === '2' ? true : false}
                                                    value={'2'}
                                                    onChange={(e) => { setGameMode(e.target.value); if(gameMode==='1')setInvalid({ value: true, msg: '', first: false }) }} />
                                                <span>{' Clássico'}
                                                    <IoHelpCircleOutline cursor="pointer" id="classic" onMouseEnter={handleTooltipClassic}
                                                        onMouseLeave={handleTooltipClassic} size={20} />
                                                    <Popover placement="right" target={'classic'} isOpen={isTooltipoOpenClassic}>
                                                        <PopoverBody>
                                                            {'Neste modo você terá 10 perguntas, sendo 5 de dificuldade fáceis, 3 médias e 2 difíceis. O tema é de sua preferência.'}
                                                        </PopoverBody>
                                                    </Popover>
                                                </span>
                                            </label>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="checkbox">
                                            <label>
                                                <input invalid={invalid}
                                                    type="checkbox"
                                                    checked={gameMode === '3' ? true : false}
                                                    value={'3'}
                                                    onChange={(e) => { setGameMode(e.target.value); if(gameMode==='1')setInvalid({ value: true, msg: '', first: false }) }} />
                                                <span>{' Infinito'}
                                                    <IoHelpCircleOutline cursor="pointer" id="infinite" onMouseEnter={handleTooltipInfinite}
                                                        onMouseLeave={handleTooltipInfinite} size={20} />
                                                    <Popover placement="right" target={'infinite'} isOpen={isTooltipoOpenInfinite}>
                                                        <PopoverBody>
                                                            {'Neste modo você terá perguntas infinitas, sempre intercalando 5 fáceis, 3 médias e 2 difíceis. O tema é de sua preferência. O jogo acaba quando você errar 3 perguntas.'}
                                                        </PopoverBody>
                                                    </Popover>
                                                </span>
                                            </label>
                                        </div>
                                    </Col>
                                </Row>
                                {gameMode !== '1' ?
                                    <>
                                        < Row >
                                            <Label>Escolha um tema:</Label>
                                        </Row>
                                        <Row md={2} xs={2}>
                                            {
                                                themeList === undefined ? '' :
                                                    themeList.map((themeListUnique, key) => {
                                                        return (
                                                            key === 0 ?
                                                                <Col key={0}>
                                                                    <div className="checkbox">
                                                                        <label>
                                                                            <input invalid={invalid}
                                                                                type="checkbox"
                                                                                value={themeListUnique.id}
                                                                                onChange={() => {
                                                                                    // quando o usuário seleciona a primeira opção ele quer todos os temas, 
                                                                                    // então a variável abaixo faz uma lista com todos os temas para ser usada
                                                                                    let themeListValue = themeList.map(themeList => { return String(themeList.id) })

                                                                                    // a condição abaixo refere-se a caso o usuário desmarque
                                                                                    // a opção 'Selecionar todos',assim esvaziando a lista.
                                                                                    // se não entrar no If entrará no Else, que significa que ele marcou que quer todos
                                                                                    // os temas, logo ele poderá prosseguir e então a variável invalid será falsa,
                                                                                    // e a lista de temas será agora de 1 até o máximo de temas que tiver.
                                                                                    if (theme.findIndex(id => parseInt(id) === parseInt(themeListUnique.id)) !== -1) {
                                                                                        setTheme([])
                                                                                    } else {
                                                                                        setInvalid({ value: false, msg: '', first: false })
                                                                                        setTheme(themeListValue)
                                                                                    }
                                                                                }} />
                                                                            <span>{' ' + themeListUnique.theme}</span>
                                                                        </label>
                                                                    </div>
                                                                </Col> :
                                                                theme[0] !== '1' ?
                                                                    <Col key={themeListUnique.id}>
                                                                        <div className="checkbox">
                                                                            <label>
                                                                                <input type="checkbox" value={themeListUnique.id}
                                                                                    onChange={e => {
                                                                                        // a condição abaixo refere-se a caso o usuário desmarque esta opção,
                                                                                        // verificará se existe a opção na lista a qual o usuário quer os 
                                                                                        // temas, se resultar em true significa que o usuário quis desmarcar esta 
                                                                                        // opção a variável lista irá retirar o item que o usuário desmarcou 
                                                                                        // e o setTheme irá gravar apenas valores que não forem undefined.
                                                                                        // Se o usuário marcou esta opção entrará no else, o que fará o invalid 
                                                                                        // ser falso e fará a lista de temas o que o usuário marcou anteriormente e agora.
                                                                                        if (theme.findIndex(id => parseInt(id) === parseInt(themeListUnique.id)) !== -1) {
                                                                                            let lista = theme.map((item, key) => { if (key !== theme.indexOf(e.target.value)) { return item } return undefined; })
                                                                                            setTheme(lista.filter(e => e !== undefined))
                                                                                        } else {
                                                                                            setInvalid({ value: false, msg: '', first: false })
                                                                                            setTheme([...theme, e.target.value])
                                                                                        }
                                                                                    }} />
                                                                                <span>{' ' + themeListUnique.theme}</span>
                                                                            </label>
                                                                        </div>
                                                                    </Col> : ''
                                                        );
                                                    })
                                            }
                                        </Row>
                                    </> : ''
                                }
                                <br />
                                {invalid.value === true ?
                                    <>
                                        <Row className="d-flex justify-content-center align-items-center">
                                            <Label style={{ color: '#c82333' }}><b>{invalid.msg}</b></Label>
                                        </Row>
                                        <Row className="d-flex justify-content-center align-items-center">
                                            <Button className="Button" size="lg" color="primary" onClick={() => setInvalid({ value: true, msg: 'Selecione um tema!', first: false })} >
                                                {'Jogar'}
                                            </Button>
                                        </Row>
                                    </>
                                    :
                                    gameMode === '1' && invalid.value === false ?
                                        <Row className="d-flex justify-content-center align-items-center">
                                            <Label style={{ color: '#c82333' }}><b>{'Modo história desabilitado'}</b></Label>
                                        </Row>
                                        //     < Link to="/history">
                                        //     <Row className="d-flex justify-content-center align-items-center">
                                        //         <Button onClick={() => setPlaying(true)} className="Button" size="lg" color="primary" >
                                        //             {'Jogar'}
                                        //         </Button>
                                        //      </Row>
                                        //     </Link>
                                        :
                                        gameMode === '2' && invalid.value === false ?
                                            < Link to="/game">
                                                <Row className="d-flex justify-content-center align-items-center">
                                                    <Button onClick={() => setPlaying(true)} className="Button" size="lg" color="primary" >
                                                        {'Jogar'}
                                                    </Button>
                                                </Row>
                                            </Link>
                                            :
                                            gameMode === '3' && invalid.value === false ?
                                                < Link to="/infinite">
                                                    <Row className="d-flex justify-content-center align-items-center">
                                                        <Button onClick={() => setPlaying(true)} className="Button" size="lg" color="primary" >
                                                            {'Jogar'}
                                                        </Button>
                                                    </Row>
                                                </Link> :
                                                <Row className="d-flex justify-content-center align-items-center">
                                                    <Button className="Button" size="lg" color="primary" onClick={() => setInvalid({ value: true, msg: 'Selecione um tema!', first: false })} >
                                                        {'Jogar'}
                                                    </Button>
                                                </Row>
                                }
                            </Col>
                        </ModalBody>
                    </Modal>
                </Container>
            </div>
        </Fragment >
    )
}
export default forwardRef(GameOptions)
