import React, { forwardRef, useContext } from "react";
import { getImage } from "../DataComponents/BD";
import { GlobalState } from "../DataComponents/GlobalState";
import { shuffleArray } from "../DataComponents/RandomInt&ShuffledArray";

function Question({ nothing }, ref) {
    const { questions, setQuestions, currentQuestion, setCurrentQuestion, setAnswers, setCorrectAnswer, setIMG, setDistractionAnswer1, setDistractionAnswer2 } = useContext(GlobalState);

    // função que baixa imagem se a questão possuir
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

    // função gera respostas de ordem aleatória para compor as alternativas
    function generateQuestion(question) {
        //console.log(question)
        setCorrectAnswer(question.rightAnswer)
        setDistractionAnswer1(question.distractionAnswer1)
        if ((question.distractionAnswer2 === undefined || question.distractionAnswer2 === null || question.distractionAnswer2 === '') &&
            (question.distractionAnswer3 === undefined || question.distractionAnswer3 === null || question.distractionAnswer3 === '')) {
            return setAnswers(shuffleArray([question.rightAnswer, question.distractionAnswer1]))
        } else {   
            setDistractionAnswer2(question.distractionAnswer2)         
            return setAnswers(shuffleArray([question.rightAnswer, question.distractionAnswer1, question.distractionAnswer2, question.distractionAnswer3]))
        }
    }

    // função reseta a questão e passa para a seguinte
    ref.current = {
        setList: function (allQuestions) {
            // seta a lista de questões que serão perguntadas            
            setQuestions(allQuestions)

            // seta a imagem como nula caso a questão anterior tivesse uma imagem
            setIMG(undefined)

            // abaixo a primeira questão é selecionada para a dispor na tela
            let firstQuestion = allQuestions[0]
            setCurrentQuestion(allQuestions[0])

            // gera a ordem aleatória de respostas da questão atual
            generateQuestion(allQuestions[0])

            // se o campo de imagem não for nulo ou indefinido 
            // ele irá baixar a imagem para dispor na tela
            if(!(firstQuestion.img===null || firstQuestion.img===undefined)){
                downloadImage(firstQuestion.img)
            }
        },
        nextQuestion: function () {
            // função chamada para percorrer a lista de questões atual 
            // abaixo ele verifica se nesse processo de chamada a última questão
            // já está sendo exibida e se está encerra na hora para não haver erros
            var next_question = questions.indexOf(currentQuestion, 0) + 1;
            var limit = questions.length;
            if (next_question===limit) {
                return "NoMoreQuestionsOver"
            }
            // gera as respostas de ordem aleatória da próxima questão
            generateQuestion(questions[next_question])

            // seta a questão atual
            setCurrentQuestion(questions[next_question])

            // baixa a imagem se a questão tiver uma
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