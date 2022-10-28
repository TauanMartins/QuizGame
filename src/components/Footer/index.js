import React, { Fragment } from "react";
import './footer.css';
import { Row, Col, Label, Container } from "reactstrap";

export default function Footer() {
    return (
        <Fragment>
            <div className="Footer">
                <Container fluid>
                    <Row>
                        <Col>
                            <Label>Tauan</Label>
                        </Col>
                        <Col>
                            <Label>Footer</Label>
                        </Col>
                        <Col>
                            <Label>Copyright</Label>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    )
}