import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { getRandomInt } from "../DataComponents/RandomInt&ShuffledArray";


function Timer({ timeOut }, ref) {
    const seconds = 59.01;
    const [timer, setTimer] = useState(undefined)
    const [counter, setCounter] = useState(seconds)
    var ms = parseFloat(`0.${getRandomInt(0,1000)}`)
    ref.current = {
        stopTimer: function () {
            clearTimeout(timer);
        },
        restartTimer: async function () {
            clearTimeout(timer);
            setCounter(seconds+ms)
        },
        ...{ counter: counter }
    }

    useEffect(() => {
        if (counter > 0) {
            setTimer(setTimeout(()=>{return setCounter(counter - 1)}, 1000))
        }
        else if (counter === 0) {
            return timeOut();
        }
        // eslint-disable-next-line
    }, [counter])

    const counterDisplayer = useMemo(() => Math.floor(counter), [counter])

    return (
        <b>Tempo:  0:{counterDisplayer < 10 ? '0' + counterDisplayer : counterDisplayer} segundos</b>
    )
}

export default forwardRef(Timer)