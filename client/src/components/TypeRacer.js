import React from 'react'
import { Redirect } from 'react-router'
import socket from '../socketConfig'
import CountDown from './CountDown';
import StartBtn from "./StartBtn";
import DisplaySentence from "./DisplaySentence";

const findMePlayer = players => {
    return players.find(player => player.socketID === socket.id)
}

const TypeRacer = ({gameState}) => {
    const {_id, players, words} = gameState
    const playerMe = findMePlayer(players)
    if(_id === "") {
        return <Redirect to="/" />
    }
    return (
        <div className="text-center">
            <DisplaySentence words={words} player={playerMe}/>
            <CountDown />
            <StartBtn playerMe={playerMe} gameID={_id}/>
        </div>
    )
}

export default TypeRacer
