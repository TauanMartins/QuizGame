import React, { createContext, useEffect, useState } from "react";
import { getSong } from "../BD";

export const GlobalState = createContext({});

function GlobalStateProvider({ children }) {
    // variáveis que compõem o jogo
    const [currentQuestion, setCurrentQuestion] = useState({ question: '' });
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
    const [listPowers, setListPowers] = useState([1, 2, 3, 4, 5, 6])
    const [power, setPower] = useState(undefined)
    const [activate, setActivate] = useState(false)
    const [multiplier, setMultiplier] = useState(1);

    // variáveis que compõem dados do jogador
    const [pontos, setPontos] = useState(0);
    const [name, setName] = useState('Unknown');

    // variável que compõe o theme que o jogador que jogar
    const [theme, setTheme] = useState([])

    // variável que comporta o áudio de todo o jogo
    const [audio, setAudio] = useState(new Audio());
    const [playing, setPlaying] = useState(false);

    const [soundEffectW, setSoundEffectW] = useState(new Audio());
    const [playingSoundEffectW, setPlayingSoundEffectW] = useState(true);
    const [soundEffectR, setSoundEffectR] = useState(new Audio());
    const [playingSoundEffectR, setPlayingSoundEffectR] = useState(true);

    useEffect(() => {
        getSong('Kahoot').then(response => {
            const url = URL.createObjectURL(response.data);
            setAudio(new Audio(url))
        })
        getSong('Wrong').then(response => {
            const url = URL.createObjectURL(response.data);
            setSoundEffectW(new Audio(url));
        })
        getSong('Correct').then(response => {
            const url = URL.createObjectURL(response.data);
            setSoundEffectR(new Audio(url));
        })
    }, [])
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
            playing, setPlaying,
            soundEffectW, setSoundEffectW,
            playingSoundEffectW, setPlayingSoundEffectW,
            soundEffectR, setSoundEffectR,
            playingSoundEffectR, setPlayingSoundEffectR
        }}>
            {children}
        </GlobalState.Provider>
    )
}

export default GlobalStateProvider