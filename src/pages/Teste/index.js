import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, Container } from "reactstrap";
import './teste.css';
import axios from "axios";

export default function Sobre() {
    const [question, setQuestion] = useState(undefined)

    useEffect(() => {
        async function getQuestion() {
            const resp = await axios.get(process.env.REACT_APP_SUPABASEURL + process.env.REACT_APP_ALLQUESTIONS,
                {
                    headers: {
                        apikey: process.env.REACT_APP_APIKEY
                    }
                });
            const json = await resp.data
            console.log(json)
            setQuestion(json)
        }
        getQuestion()
    }, [])
    return (

        <Fragment>
            <div className="Teste">
                <Container fluid>
                    <br />
                    <Row>
                        <Col>
                            <Card style={{ minHeight: '300px', color: 'black' }}>
                                {question}
                            </Card>
                        </Col>
                    </Row>
                    <br />
                </Container>
            </div>
        </Fragment >

    )
}

