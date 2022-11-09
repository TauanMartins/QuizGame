import React, { Fragment, useRef } from "react";
import './home.css';
import { Button, Container, Row, Col } from "reactstrap";
import Name from "../../components/Name";

export default function Home() {
    const NameRef = useRef(null)
    function adcName() {
        return NameRef.current.adicionarName()
    }
    return (
        <Fragment>
            <div className="Home">
                <Container fluid>
                    <Name ref={NameRef} />
                    <Row>
                        <Col>
                            <Button onClick={adcName} className="Button" size="lg" color="primary" >
                                {"Jogar"}
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    )
}