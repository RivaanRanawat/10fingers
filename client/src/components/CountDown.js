import React, { useEffect, useState } from 'react'
import socket from '../socketConfig'

const CountDown = () => {
    const [timer, setTimer] = useState({countDown: "", msg: ""})
    useEffect(() => {
        socket.on("timer", data => {
            setTimer(data)
        })

        socket.on("done", () => {
            socket.removeListener("timer")
        })
    }, [])
    return (
        <div>
            <h1>{timer.countDown}</h1>
            <h3>{timer.msg}</h3>
        </div>
    )
}

export default CountDown
