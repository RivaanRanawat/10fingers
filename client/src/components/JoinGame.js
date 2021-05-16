import React, { useState } from 'react'
import socket from '../socketConfig';

function JoinGame() {
    const [nickname, setNickname] = useState("");
    const [gameId, setGameId] = useState("");

    const onNicknameChange = (e) => {
        setNickname(e.target.value)
    }

    const onGameIdChange = e => {
        setGameId(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        socket.emit("join-game", {nickname, gameId})
    }
    
    return (
        <div className="row">
            <div className="col-sm"></div>
            <div className="col-sm-8">
                <h1 className="text-center">Join Game</h1>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="nickname">Enter nickname</label>
                        <input type="text" className="form-control" onChange={onNicknameChange} value={nickname} name="nickname" placeholder="Enter nickname" />
                        <label htmlFor="gameID" className="mt-2">Enter Game ID</label>
                        <input type="text" className="form-control" onChange={onGameIdChange} value={gameId} name="gameID" placeholder="Enter Game ID" />
                    </div>
                    <button type="submit" className="btn btn-primary mt-2">Submit</button>
                </form>
            </div>
            <div className="col-sm"></div>
        </div>
    )
}

export default JoinGame
