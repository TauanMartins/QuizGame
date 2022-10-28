import React, { createContext, useState } from "react";

export const GlobalState = createContext({});

function GlobalStateProvider({children}){

    const [selectedPlayer, setSelectedPlayer] = useState(undefined);
    const [selectedPlayerIMG, setSelectedPlayerIMG] = useState(undefined);
    const [players, setPlayers] = useState([{}]);

    const [question, setQuestion] = useState(undefined);
    const [questionAbout, setQuestionAbout] = useState(undefined);

    const [correctAnswer, setCorrectAnswer] = useState(undefined);
    const [answers, setAnswers] = useState([]);

    return (
        <GlobalState.Provider value={{selectedPlayer, setSelectedPlayer, selectedPlayerIMG, setSelectedPlayerIMG, players, setPlayers, question, setQuestion, questionAbout, setQuestionAbout, correctAnswer, setCorrectAnswer, answers, setAnswers}}>
            {children}
        </GlobalState.Provider>
    )
}

export default GlobalStateProvider