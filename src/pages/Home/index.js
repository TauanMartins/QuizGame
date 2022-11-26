import React, { Fragment, useRef } from "react";
import './home.css';
import { Button, Container, Row, Col } from "reactstrap";
import GameOptions from "../../components/GameOptions";
import AllScoreboard from "../../components/AllScoreboard";

export default function Home() {
    const GameOptionsRef = useRef(null);
    const GenericModalRef = useRef(null);
    return (
        <Fragment>
            <div className="Home">
                <Container fluid>
                    <GameOptions ref={GameOptionsRef} />
                    <AllScoreboard ref={GenericModalRef}/>
                    <Row>
                        <Col>
                            <Button onClick={()=>  GameOptionsRef.current.startGameOptions()} className="Button" size="lg" color="primary" >
                                {"Jogar"}
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={()=>GenericModalRef.current.open()} outline size="lg" color="primary" >
                                {"ScoreBoard"}
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    )
}