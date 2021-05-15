import { useHistory } from "react-router-dom";

import React from 'react'

const GameMenu = props => {
    let history = useHistory()
    return (
        <div className="text-center">
            <h1>Welcome to 10Fingers</h1>
            <div className="p-3"><button className="btn btn-primary btn-lg" type="button" onClick={() => history.push("/game/create")}>Create Game</button></div>
            <div><button className="btn btn-primary btn-lg" type="button" onClick={() => history.push("/game/join")}>Join Game</button></div>
        </div>
    )
}

export default GameMenu
