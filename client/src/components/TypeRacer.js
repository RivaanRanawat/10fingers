import React from 'react'
import { Redirect } from 'react-router'
import socket from '../socketConfig'
import CountDown from './CountDown';
import StartBtn from "./StartBtn";

const findMePlayer = players => {
    return players.find(player => player.socketID === socket.id)
}

const TypeRacer = ({gameState}) => {
    const {_id, players} = gameState
    const playerMe = findMePlayer(players)
    if(_id === "") {
        return <Redirect to="/" />
    }
    return (
        <div className="text-center">
            <CountDown />
            <StartBtn playerMe={playerMe} gameID={_id}/>
        </div>
    )
}

export default TypeRacer
