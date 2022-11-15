import React, { createContext, useState } from "react";

export const GlobalState = createContext({});

function GlobalStateProvider({ children }) {

    const [currentQuestion, setCurrentQuestion] = useState({question: ''});
    const [img, setIMG] = useState(undefined)
    const [questions, setQuestions] = useState(undefined);
    const [correctAnswer, setCorrectAnswer] = useState(undefined);
    const [answers, setAnswers] = useState([]);
    const [pontos, setPontos] = useState(0);
    const [name, setName] = useState('Unknown')
    const [theme, setTheme] = useState(undefined)

    return (
        <GlobalState.Provider value={{
            currentQuestion, setCurrentQuestion,
            questions, setQuestions,
            correctAnswer, setCorrectAnswer,
            answers, setAnswers,
            pontos, setPontos,
            name, setName,
            img, setIMG,
            theme, setTheme
        }}>
            {children}
        </GlobalState.Provider>
    )
}

export default GlobalStateProvider