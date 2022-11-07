import React, { Fragment } from "react";
import { Row, Col, Label, Container } from "reactstrap";
import './header.css';
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <Fragment>
            <div className="Header">
                <Container fluid>
                    <Col>
                        <Row>
                            <Col className="d-flex justify-content-center align-items-center">
                                <Label >
                                    <Link to="/">
                                        Início
                                    </Link>
                                </Label>
                            </Col>
                            <Col className="d-flex justify-content-center align-items-center" >
                                <Label>
                                    <h3>
                                        Quiz Things
                                    </h3>
                                </Label>
                            </Col>
                            <Col className="d-flex justify-content-center align-items-center">
                                <Label>
                                    <Link to="/sobre">
                                        Sobre
                                    </Link>
                                </Label>
                            </Col>
                        </Row>
                    </Col>
                </Container>
            </div>
        </Fragment>
    )
}