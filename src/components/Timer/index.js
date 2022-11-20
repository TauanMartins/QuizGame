import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { getRandomInt } from "../DataComponents/RandomInt&ShuffledArray";


function Timer({ timeOut }, ref) {
    const seconds = 21.01;
    const [timer, setTimer] = useState(undefined)
    const [counter, setCounter] = useState(seconds)
    var ms = parseFloat(`0.${getRandomInt(0, 1000)}`)
    ref.current = {
        stopTimer: function () {
            clearTimeout(timer);
            setTimer('overgame')
        },
        restartTimer: async function () {
            clearTimeout(timer);
            setCounter(seconds + ms)
        },
        ...{ counter: counter }
    }

    useEffect(() => {
        if (Math.floor(counter) === 0) {
            return timeOut();
        }
        else if (Math.floor(counter) > 0 && timer !=='overgame') {
            setTimer(setTimeout(() => { return setCounter(counter - 1) }, 1000))
        }


        // eslint-disable-next-line
    }, [counter])

    const counterDisplayer = useMemo(() => Math.floor(counter), [counter])

    return (
        <b>Tempo:  0:{counterDisplayer < 10 ? '0' + counterDisplayer : counterDisplayer} segundos</b>
    )
}

export default forwardRef(Timer)