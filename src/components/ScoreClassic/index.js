import React, { useState, useEffect, Fragment } from "react";
import { Table } from "reactstrap";
import { selectMaxScoreClassic } from "../DataComponents/BD";

export default function ScoreClassic({ s }) {

    const [score, setScore] = useState(undefined)

    useEffect(() => {
        selectMaxScoreClassic().then(response => { return setScore(response.data) })
    }, [])
    return (
        <Fragment>
            <Table bordered responsive striped className="tableScore">
                <thead>
                    <tr>
                        <th style={{ width: "3%" }}>Pos.</th>
                        <th style={{ width: "56%" }}>Nome</th>
                        <th style={{ width: "20%" }}>Score</th>
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
                                        <th key={user.id} scope="row">{key + 1}º</th>
                                        <th key={user.name} scope="row">{user.name}</th>
                                        <td>{user.score}</td>
                                    </tr>
                                );
                            })
                    }
                </tbody>
            </Table>
        </Fragment>
    )
}
