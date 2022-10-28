import React, { forwardRef, useEffect, useMemo, useState } from "react";


function Timer({ timeOut }, ref) {
    const seconds = 59;
    var timer = '';
    const [counter, setCounter] = useState(seconds)

    // delay to not bug the timer
    function rest(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    ref.current = {
        stopTimer: function () {
             clearTimeout(timer);

        },
        restartTimer: async function () {
            clearTimeout(timer);
            await rest(500);
            setCounter(seconds);
        },
        ...{ counter: counter }
    }

    useEffect(() => {
        clearTimeout(timer);
        if (counter > 0) {
            timer = setTimeout(() => {
                setCounter(counter - 1)
            }, 1000)
        }
        else if (counter === 0) {
            return timeOut();
        }
    }, [counter])

    const counterDisplayer = useMemo(() => counter, [counter])

    return (
        <span>
            <b>Tempo:  0:{counterDisplayer < 10 ? '0' + counterDisplayer : counterDisplayer} segundos</b>
        </span>
    )
}

export default forwardRef(Timer)