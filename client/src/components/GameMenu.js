import { useHistory } from "react-router-dom";

import React from 'react'

const GameMenu = props => {
    let history = useHistory()
    return (
        <div className="text-center">
            <h1>Welcome to 10Fingers</h1>
            <button className="btn btn-primary btn-lg" style={{marginRight: "0.4rem"}} type="button" onClick={() => history.push("/game/create")}>Create Game</button>
            <button className="btn btn-primary btn-lg" type="button" onClick={() => history.push("/game/join")}>Join Game</button>
        </div>
    )
}

export default GameMenu
