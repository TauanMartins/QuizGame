import React, { createContext, useState } from "react";

export const GlobalState = createContext({});

function GlobalStateProvider({ children }) {
    // variáveis que compõem o jogo
    const [currentQuestion, setCurrentQuestion] = useState({question: ''});
    const [img, setIMG] = useState(undefined)
    const [questions, setQuestions] = useState(undefined);
    const [correctAnswer, setCorrectAnswer] = useState(undefined);
    const [answers, setAnswers] = useState([]);
    const [overQuestions, setOverQuestions] = useState(false);
    const [overQuestionsGame, setOverQuestionsGame] = useState(false);
    

    // variáveis para compor os poderes e atributos não essenciais
    const [streak, setStreak] = useState(0);
    const [distractionAnswer1, setDistractionAnswer1] = useState(undefined);
    const [distractionAnswer2, setDistractionAnswer2] = useState(undefined);
    const [listPowers, setListPowers] = useState([1,2,3,4,5,6])
    const [power, setPower] = useState(undefined)
    const [activate, setActivate] = useState(false)
    const [multiplier, setMultiplier] = useState(1);

    // variáveis que compõem dados do jogador
    const [pontos, setPontos] = useState(0);
    const [name, setName] = useState('Unknown');

    // variável que compõe o theme que o jogador que jogar
    const [theme, setTheme] = useState([])

    // variável que comporta o áudio
    const [audio, setAudio] = useState(new Audio('https://jxwgirdubbbwmarmeoag.supabase.co/storage/v1/object/public/sounds/Kahoot?t=2022-11-23T17%3A03%3A18.908Z'));
    const [playing, setPlaying] = useState(false);

    return (
        <GlobalState.Provider value={{
            currentQuestion, setCurrentQuestion,
            questions, setQuestions,
            correctAnswer, setCorrectAnswer,
            answers, setAnswers,
            pontos, setPontos,
            name, setName,
            img, setIMG,
            theme, setTheme,
            streak, setStreak,
            distractionAnswer1, setDistractionAnswer1,
            distractionAnswer2, setDistractionAnswer2,
            power, setPower,
            activate, setActivate,
            multiplier, setMultiplier,
            listPowers, setListPowers,
            overQuestions, setOverQuestions,
            overQuestionsGame, setOverQuestionsGame,
            audio, setAudio,
            playing, setPlaying

        }}>
            {children}
        </GlobalState.Provider>
    )
}

export default GlobalStateProvider