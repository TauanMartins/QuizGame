import React, { Fragment, useRef } from "react";
import './home.css';
import { Button, Container, Row, Col } from "reactstrap";
import Name from "../../components/Name";
import Endgame from "../../components/Endgame";

export default function Home() {
    const NameRef = useRef(null)
    const EndGameRef = useRef(null)
    return (
        <Fragment>
            <div className="Home">
                <Container fluid>
                    <Name ref={NameRef} />
                    <Endgame visible ref={EndGameRef}/>
                    <Row>
                        <Col>
                            <Button onClick={()=>  NameRef.current.adicionarName()} className="Button" size="lg" color="primary" >
                                {"Jogar"}
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={()=>EndGameRef.current.endgame()} size="lg" color="primary" >
                                {"ScoreBoard"}
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    )
}