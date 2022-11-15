import React, { Fragment, useState, forwardRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Modal, ModalBody, Input, Button, Container, ModalHeader, Label, Row } from "reactstrap";
import { GlobalState } from "../../components/DataComponents/GlobalState";
import { selectAllThemes } from "../DataComponents/BD";

function NameComp({ a }, ref) {
    const [abrir, setAbrir] = useState(false);
    const [invalid, setInvalid] = useState('true');
    const { setName, setPontos, setTheme, theme } = useContext(GlobalState)

    const [themeOld, setThemeOld] = useState(undefined);
    const [themeList, setThemeList] = useState(undefined);


    function handleTooltip() {
        setAbrir(!abrir);
    }
    ref.current = {
        adicionarName: function () {
            setName('Unknown')
            setTheme([])
            setAbrir(true)
            setPontos(0)
        }
    }
    useEffect(() => {
        selectAllThemes().then(response => setThemeList(response.data))
    }, [])
    useEffect(() => {
        if (theme !== undefined) {
            if (Object.keys(theme).length === 0) {
                setInvalid('true')
            }
        }
    }, [theme])
    return (
        <Fragment>
            <Container fluid>
                <Modal centered isOpen={abrir} style={{ color: 'black' }} >
                    <ModalHeader toggle={handleTooltip}>
                        Digite seu nome para fazer parte do HighScore no final
                    </ModalHeader>
                    <ModalBody >
                        <Col>
                            <Row>
                                <Label style={{ textAlign: 'left' }}>Nome:</Label>
                            </Row>

                            <Row>
                                <Input placeholder='João' onChange={e => { if (e === '') { return true } else { return setName(e.target.value) } }} />
                            </Row>
                            <Row>
                                <Label style={{ textAlign: 'left' }}>Escolha um tema:</Label>
                            </Row>
                            <Row>
                                <Col>
                                    {
                                        themeList === undefined ? '' :
                                            themeList.map((tema, key) => {
                                                return (
                                                    key === 0 ?
                                                        <Row key={0}>
                                                            <input invalid={invalid} type="checkbox" value={tema.id}
                                                                onChange={() => {
                                                                    var x = document.getElementsByClassName("others");
                                                                    var i;
                                                                    let themelist = themeList.map(theme => { return String(theme.id) })

                                                                    if (theme.findIndex(id => parseInt(id) === parseInt(tema.id)) !== -1) {
                                                                        for (i = 0; i < x.length; i++) {
                                                                            x[i].style.display = 'flex';
                                                                        }
                                                                        setTheme(themeOld)
                                                                    } else {
                                                                        for (i = 0; i < x.length; i++) {
                                                                            x[i].style.display = 'none';
                                                                        }
                                                                        setInvalid('false')
                                                                        setThemeOld(theme)
                                                                        setTheme(themelist)
                                                                    }
                                                                }} />
                                                            <div style={{ fontSize: '13px' }} >{tema.theme}</div>
                                                        </Row> :

                                                        <Row key={tema.id} className='others' >
                                                            <input type="checkbox" value={tema.id} id={tema.id}
                                                                onChange={e => {

                                                                    if (theme === undefined) {
                                                                        setInvalid('false')
                                                                        setTheme([e.target.value])
                                                                    }
                                                                    else if (theme.findIndex(id => parseInt(id) === parseInt(tema.id)) !== -1) {
                                                                        let lista = theme.map((item, key) => { if (key !== theme.indexOf(e.target.value)) { return item } return undefined; })
                                                                        setTheme(lista.filter(e => e !== undefined))
                                                                        setThemeOld(theme.findIndex(id => parseInt(id) === parseInt(tema.id)), 1)
                                                                    } else {
                                                                        setInvalid('false')
                                                                        setTheme([...theme, e.target.value])
                                                                    }
                                                                }} />
                                                            <div style={{ fontSize: '13px' }} >{tema.theme}</div>
                                                        </Row>

                                                );
                                            })
                                    }
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-center align-items-center">
                                <Label style={{ display: invalid === 'true' ? 'block' : 'none', color: '#c82333' }}>Selecione um tema!</Label>
                            </Row>
                            <br />
                            {invalid === 'true' ?
                                <Row className="d-flex justify-content-center align-items-center">
                                    <Button className="Button" size="lg" color="primary" >
                                        {'Jogar'}
                                    </Button>
                                </Row>
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
        </Fragment >
    )
}
export default forwardRef(NameComp)
