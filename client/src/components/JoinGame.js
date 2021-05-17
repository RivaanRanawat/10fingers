import React, { useEffect, useState } from 'react'
import socket from '../socketConfig';

function JoinGame() {
    const [nickname, setNickname] = useState("");
    const [gameId, setGameId] = useState("");
    const [errorText, setErrorText] = useState("")

    const onNicknameChange = (e) => {
        setNickname(e.target.value)
    }

    const onGameIdChange = e => {
        setGameId(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        socket.emit("join-game", { nickname, gameId })
    }

    useEffect(() => {
        socket.on("notCorrectGame", msg => {
            setErrorText(msg);
        })
    }, [])

    return (
        <div className="row">
            <div className="col-sm"></div>
            <div className="col-sm-8">
                <div>
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
                {errorText !== "" ? <div className="alert alert-danger mt-3" role="alert">{errorText}</div> : null}
            </div>
            <div className="col-sm"></div>
        </div>
    )
}

export default JoinGame
