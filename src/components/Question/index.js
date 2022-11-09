import React, { forwardRef, useContext } from "react";
import { GlobalState } from "../DataComponents/GlobalState";
import { shuffleArray } from "../DataComponents/RandomInt&ShuffledArray";

function Question({ nothing }, ref) {
    const { questions, setQuestions, currentQuestion, setCurrentQuestion, setAnswers, setCorrectAnswer } = useContext(GlobalState);

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
            // abaixo a primeira questão é selecionada para a questão
            setCurrentQuestion(allQuestions[0])
            // gera a primeira questão
            generateQuestion(allQuestions[0])

        },
        nextQuestion: function () {
            var next_question = questions.indexOf(currentQuestion, 0) + 1;
            if (questions[next_question] === undefined) {
                return "NoMoreQuestionsOver"
            }
            generateQuestion(questions[next_question])
            setCurrentQuestion(questions[next_question])

        }
    }

    return (
        <h4><b>{currentQuestion.question}</b></h4>
    )
}

export default forwardRef(Question)