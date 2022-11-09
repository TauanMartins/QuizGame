import React, { useState, useEffect } from "react";
import { Container, Table } from "reactstrap";
import { selectMaxScore } from "../DataComponents/BD";

export default function Score({ s }) {

    const [score, setScore] = useState(undefined)

    useEffect(() => {
        selectMaxScore().then(response => { return setScore(response.data) })
    }, [])
    return (
        <Container>
            <Table bordered responsive striped>
                <thead>
                    <tr>
                        <th style={{ width: "3%" }}>Colocação</th>
                        <th style={{ width: "66%" }}>Nome</th>
                        <th style={{ width: "30%" }}>Pontuação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        score === undefined ?
                            <tr key={0}>
                                <th scope="row"></th>
                                <td></td>
                            </tr>
                            : score.map((user, key) => {
                                return (
                                    <tr key={user.id}>
                                        <th key={user.id} scope="row">{key+1}º</th>
                                        <th key={user.name} scope="row">{user.name}</th>
                                        <td>{user.score}</td>
                                    </tr>
                                );
                            })
                    }
                </tbody>
            </Table>
        </Container>
    )
}
