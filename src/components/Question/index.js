import React, { forwardRef, useContext } from "react";
import { getImage } from "../DataComponents/BD";
import { GlobalState } from "../DataComponents/GlobalState";
import { shuffleArray } from "../DataComponents/RandomInt&ShuffledArray";

function Question({ nothing }, ref) {
    const { questions, setQuestions, currentQuestion, setCurrentQuestion, setAnswers, setCorrectAnswer, setIMG } = useContext(GlobalState);

    async function downloadImage(path) {
        try {
            getImage(path).then(response => {
                const url = URL.createObjectURL(response.data)
                setIMG(url)
            })

        } catch (error) {
            console.log('Error downloading image: ', error)
        }
    }

    function generateQuestion(question) {
        //console.log(question)
        setCorrectAnswer(question.rightAnswer)
        if ((question.distractionAnswer2 === undefined || question.distractionAnswer2 === null || question.distractionAnswer2 === '') &&
            (question.distractionAnswer3 === undefined || question.distractionAnswer3 === null || question.distractionAnswer3 === '')) {
            return setAnswers(shuffleArray([question.rightAnswer, question.distractionAnswer1]))
        } else {
            return setAnswers(shuffleArray([question.rightAnswer, question.distractionAnswer1, question.distractionAnswer2, question.distractionAnswer3]))
        }
    }
    ref.current = {
        setList: function (allQuestions) {

            // abaixo seta todas as questões da partida
            setQuestions(allQuestions)
            setIMG(undefined)
            // abaixo a primeira questão é selecionada para a questão
            let firstQuestion = allQuestions[0]
            setCurrentQuestion(allQuestions[0])
            // gera a primeira questão
            generateQuestion(allQuestions[0])
            if(!(firstQuestion.img===null || firstQuestion.img===undefined)){
                downloadImage(firstQuestion.img)
            }
        },
        nextQuestion: function () {
            var next_question = questions.indexOf(currentQuestion, 0) + 1;
            generateQuestion(questions[next_question])
            setCurrentQuestion(questions[next_question])
            if(!(questions[next_question].img===null || questions[next_question].img===undefined)){
                downloadImage(questions[next_question].img)
            }else{
                setIMG(undefined)
            }

        }
    }

    return (
        <h4><b>{currentQuestion.question}</b></h4>
    )
}

export default forwardRef(Question)