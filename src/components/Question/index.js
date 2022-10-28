import React, { forwardRef, useContext, useEffect } from "react";
import { Label } from "reactstrap";
import api from "../../services/api";
import { countries } from '../Countries';
import { shuffleArray } from '../RandomInt&ShuffledArray';
import { rawQuestions, rawParameters } from "../../components/RawQuestions&Parameters";
import { getImagePlayer } from "../ImagePlayer";
import { GlobalState } from "../../components/GlobalState";

function Question({nothing},ref) {
    const { selectedPlayer, selectedPlayerIMG, answers, correctAnswer, players, question, questionAbout, setSelectedPlayer, setSelectedPlayerIMG, setPlayers, setQuestion, setQuestionAbout, setCorrectAnswer, setAnswers } = useContext(GlobalState);


    var indexRandom = 1;
    var nations = countries
    var nationsShuffled = shuffleArray(nations)

    function generateQuestion(player) {
        // se por acaso o peso do jogador for 0 (API não preencheu), será gerada outra pergunta
        if (player.weight === 0) {
            while (indexRandom === 1) {
                indexRandom = Math.floor(Math.random() * rawParameters.length)
            }
        } else {
            indexRandom = Math.floor(Math.random() * rawParameters.length)
        }
        //console.log(player)
        // com base na pegunta aleatória que vier, cairá em um dos switches abaixo
        // a partir daí a sequência é: 
        // 1 -  setar sobre oq é a pergunta. Ex: weight
        // 2 - setar a pergunta de fato.
        // 3 - setar a resposta certa.
        // 4 - mandar a resposta certa para o componente pai para quando o usuário
        //     responder o programa saber se ele acertou ou n e assim somar a pontuação.
        // 5 - setar a lista de respostas.
        // 6 - mandar a lista de respostas para o componente pai para renderizar na tela.
        switch (indexRandom) {
            case 0:
                setQuestionAbout(Object.keys(rawQuestions)[indexRandom])
                setQuestion(rawQuestions.height)
                setCorrectAnswer(player.height)
                setAnswers(shuffleArray([player.height, player.height - 3, player.height + 4, player.height + 7]))
                break;
            case 1:
                setQuestionAbout(Object.keys(rawQuestions)[indexRandom])
                setQuestion(rawQuestions.weight)
                setCorrectAnswer(player.weight)
                setAnswers(shuffleArray([player.weight + 6, player.weight + 2, player.weight, player.weight - 4]))
                break;
            case 2:
                setQuestionAbout(Object.keys(rawQuestions)[indexRandom])
                setQuestion(rawQuestions.birthDate)

                setCorrectAnswer(player.birthDate)
                setAnswers(shuffleArray(['2000-01-5', '1998-04-30', '1992-07-28', player.birthDate]))
                break;
            case 3:
                setQuestionAbout(Object.keys(rawQuestions)[indexRandom])
                setQuestion(rawQuestions.age)

                setCorrectAnswer(player.age)
                setAnswers(shuffleArray([player.age + 2, player.age, player.age - 3, player.age + 1]))
                break;
            case 4:
                let nation;
                async function getNameCountries() {
                    const response = await api.get(`api/nations/${player.nation}`).then(value => {
                        const json = value.data;
                        nation = json.nation.name;
                        setCorrectAnswer(nation)
                        setAnswers(shuffleArray([nation,
                            String(nationsShuffled[0]) === String(nation) ? nationsShuffled[1] : nationsShuffled[0],
                            String(nationsShuffled[5]) === String(nation) ? nationsShuffled[6] : nationsShuffled[5],
                            String(nationsShuffled[8]) === String(nation) ? nationsShuffled[9] : nationsShuffled[8]]))
                    })
                    return response;
                }

                getNameCountries()
                setQuestionAbout(Object.keys(rawQuestions)[indexRandom])
                setQuestion(rawQuestions.nation)

                break;
            case 5:
                setQuestionAbout(Object.keys(rawQuestions)[indexRandom])
                setQuestion(rawQuestions.foot)

                let answer = player.foot;
                let answerOposite = answer === 'Left' ? 'Right' : 'Left';
                setAnswers(shuffleArray([player.foot, answerOposite]))
                setCorrectAnswer(player.foot)
                break;
            case 6:
                setQuestionAbout(Object.keys(rawQuestions)[indexRandom])
                setQuestion(rawQuestions.position)

                setCorrectAnswer(player.position)
                setAnswers(shuffleArray([player.position,
                'GK' === String(player.position) ? 'ST' : 'GK',
                'RB' === String(player.position) ? 'ST' : 'RB',
                'CB' === String(player.position) ? 'ST' : 'CB']))
                break;
            case 7:
                setQuestionAbout(Object.keys(rawQuestions)[indexRandom])
                setQuestion(rawQuestions.defending)

                if (player.defending > player.dribbling) {
                    setCorrectAnswer(player.defending)
                    setAnswers(shuffleArray(['Defesa', 'Drible']))
                } else {
                    setCorrectAnswer(player.dribbling)
                    setAnswers(shuffleArray(['Defesa', 'Drible']))
                }
                break;
            case 8:
                setQuestionAbout(Object.keys(rawQuestions)[indexRandom])
                setQuestion(rawQuestions.dribbling)

                if (player.defending > player.dribbling) {
                    setCorrectAnswer(player.defending)
                    setAnswers(shuffleArray(['Defesa', 'Drible']))
                } else {
                    setCorrectAnswer(player.dribbling)
                    setAnswers(shuffleArray(['Defesa', 'Drible']))
                }
                break;
            default:
                break;
        }
    }
    ref.current = {
        setList: function (allPlayers) {

            // abaixo set o state player com todos os jogadores
            setPlayers(allPlayers)

            // abaixo o primeiro jogador é selecionado para a questão
            setSelectedPlayer(allPlayers[0])
            getImagePlayer(allPlayers[0].id).then(e => setSelectedPlayerIMG(e))
            // abaixo é chamado o ref para jogar o jogador selecionado para componente pai

            // é mostrado o jogador
            //console.log(listPlayers[0])

            // gera a questão sobre o primeiro jogador especificado
            generateQuestion(allPlayers[0])

        },
        nextQuestion: function () {
            // depois da função nextQuestion ser acionada o jogador atual é deixado
            // para trás e abaixo a variável busca o jogador de índice 2 na lista geral
            var next_player = players.indexOf(selectedPlayer, 0) + 1;

            // é mostrado o novo jogador
            //console.log(players[next_player])

            // é gerada uma questão sobre esse jogador
            generateQuestion(players[next_player])

            // a variável player é atualizada para o novo jogador
            setSelectedPlayer(players[next_player])
            getImagePlayer(players[next_player].id).then(e => setSelectedPlayerIMG(e))
            // é jogado para o componente pai o novo jogador

        },
        ...{ selectedPlayer: selectedPlayer, answers: answers, correctAnswer: correctAnswer, selectedPlayerIMG: selectedPlayerIMG }
    }

    useEffect(() => {
        // lixo que reclamam por n usar:
        if (questionAbout === 'lixo') {
            let lixo = (questionAbout, correctAnswer, answers)
            console.log(lixo)
        }
    }, [question])
    return (
        <Label>
            <b>{question}</b>
        </Label>
    )
}

export default forwardRef(Question)