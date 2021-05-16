import React, { useState } from 'react'
import socket from '../socketConfig';

const StartBtn = ({playerMe, gameID}) => {
    const [showBtn, setShowBtn] = useState(true);
    const onClickHandler = () => {
        socket.emit("timer", {playerId: playerMe._id, gameID})
        setShowBtn(false);
    }

    return (
        playerMe.isPartyLeader && showBtn? <button type="button" className="btn btn-primary" onClick={onClickHandler}>Start Game</button>
                                        : null
    )
}

export default StartBtn
