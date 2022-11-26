import React, { forwardRef, useContext, useEffect, useMemo, useState } from "react";
import { GlobalState } from "../DataComponents/GlobalState";
import { getRandomInt } from "../DataComponents/RandomInt&ShuffledArray";


function Timer({ timeOut }, ref) {
    const seconds = 21.01;
    const [timer, setTimer] = useState(undefined)
    const [counter, setCounter] = useState(seconds)
    const [colorD, setColorD] = useState('black')
    const [fontD, setFontD] = useState('1rem')

    const { soundEffectT, audio } = useContext(GlobalState);

    var ms = parseFloat(`0.${getRandomInt(0, 1000)}`)
    ref.current = {
        stopTimer: function () {
            clearTimeout(timer);
            setTimer('overgame')
        },
        restartTimer: async function () {
            soundEffectT.pause();
            soundEffectT.currentTime = 0;
            setFontD('1rem')
            setColorD('black')
            clearTimeout(timer);
            setCounter(seconds + ms)
        },
        freeze: async function () {
            clearTimeout(timer);
        },
        ...{ counter: counter }
    }

    useEffect(() => {
        if (Math.floor(counter) === 0) {
            audio.volume = 1
            setFontD('1rem')
            setColorD('black')
            return timeOut();
        } else if (Math.floor(counter) > 0 && timer !== 'overgame') {
            setTimer(setTimeout(() => { return setCounter(counter - 1) }, 1000))
        }

        // se restar 5 segundos o som irá tocar, e se for abaixo disso a fonte e cor mudará
        if (Math.floor(counter) === 5) {
            console.log('entrou')
            soundEffectT.play();
            audio.volume = 0.1
        }
        if (Math.floor(counter) <= 5) {
            if (Math.floor(counter) % 2 === 0) {
                setColorD('black')
                setFontD('13px')
            } else {
                setFontD('17px')
                setColorD('red')
            }
        }
        // eslint-disable-next-line
    }, [counter])

    const counterDisplayer = useMemo(() => Math.floor(counter), [counter])

    return (
        <b style={{ color: colorD, fontSize: fontD }}>Tempo:  0:{counterDisplayer < 10 ? '0' + counterDisplayer : counterDisplayer} segundos</b>
    )
}

export default forwardRef(Timer)