import React, { Fragment, useState, forwardRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Modal, ModalBody, Input, Button, Container, ModalHeader, Label, Row } from "reactstrap";
import { GlobalState } from "../DataComponents/GlobalState";
import { selectAllThemes } from "../DataComponents/BD";

function GameOptions({ a }, ref) {
    // variável para abrir e fechar o modal
    const [abrir, setAbrir] = useState(false);

    // variável para identificar se o jogador preencheu um tema
    const [invalid, setInvalid] = useState({ value: 'true', msg: '', first: true });

    // variáveis para definir opções do jogador
    const { setName, setPontos, setTheme, theme, setActivate, setPower, setMultiplier, setStreak } = useContext(GlobalState)

    // variáveis para apresentar a lista correta ao usuário à 
    // medida que ele for marcando e desmarcando as checkboxes
    const [themeList, setThemeList] = useState(undefined);

    // função para abrir o modal
    function handleTooltip() {
        setAbrir(!abrir);
    }

    // função chamada na Home, ao clicar em Jogar irá abrir o modal, e
    // caso o usuário já tenha jogado irá setar para variáveis padrão.
    ref.current = {
        startGameOptions: function () {
            setAbrir(true);
            setName('Unknown');
            setTheme([]);           
            setPontos(0);
            setActivate(false);
            setPower(undefined);
            setStreak(0);
            setMultiplier(1);
        }
    }

    // ao carregar esse componente a lista com todos os temas será carregada
    useEffect(() => {
        selectAllThemes().then(response => setThemeList(response.data))
    }, [])

    // toda vez que o usuário marcar e desmarcar uma opção de tema irá passar
    // por essa condição e verificará se o usuário deixou a lista de tema vazia,
    // mostrando uma mensagem de erro e impedindo o prosseguimento do jogo.
    useEffect(() => {
        if (theme.length === 0 && invalid.first===false) {
            setInvalid({ value: true, msg: 'Selecione um tema!', first: false})
        }
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

                                <br />
                                {invalid.value === true ?
                                    <>
                                        <Row className="d-flex justify-content-center align-items-center">
                                            <Label style={{ color: '#c82333' }}><b>{invalid.msg}</b></Label>
                                        </Row>
                                        <Row className="d-flex justify-content-center align-items-center">
                                            <Button className="Button" size="lg" color="primary" onClick={()=> setInvalid({ value: true, msg: 'Selecione um tema!', first: false})} >
                                                {'Jogar'}
                                            </Button>
                                        </Row>
                                    </>
                                    :
                                    < Link to="/game">
                                        <Row className="d-flex justify-content-center align-items-center">
                                            <Button className="Button" size="lg" color="primary" >
                                                {'Jogar'}
                                            </Button>
                                        </Row>
                                    </Link>
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
