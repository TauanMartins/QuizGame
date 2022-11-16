import React, { Fragment, useRef } from "react";
import './home.css';
import { Button, Container, Row, Col } from "reactstrap";
import GameOptions from "../../components/GameOptions";
import GenericModal from "../../components/GenericModal";
import Score from "../../components/Score";

export default function Home() {
    const GameOptionsRef = useRef(null);
    const GenericModalRef = useRef(null);
    return (
        <Fragment>
            <div className="Home">
                <Container fluid>
                    <GameOptions ref={GameOptionsRef} />
                    <GenericModal Label={"ScoreBoard"} Content={<Score/>} ref={GenericModalRef}/>
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