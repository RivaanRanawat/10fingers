const express = require("express");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const Game = require("./models/Game");
const getSentence = require("./api/sentenceApi");

const app = express()
const expressServer = app.listen(3001);
const io = socketio(expressServer);

mongoose.connect("mongodb://localhost:27017/typeRacingClone", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to database")
})

io.on("connection", (socket) => {

    socket.on("userInput", async ({userInput, gameID}) => {
        let game = await Game.findById(gameID);
        if(!game.isJoin && !game.isOver) {
            let player = game.players.find(player => player.socketID === socket.id);
            if(game.words[player.currentWordIndex] === userInput) {
                player.currentWordIndex ++;
                if(player.currentWordIndex !== game.words.length) {
                    game = await game.save();
                    io.to(gameID).emit("updateGame", game);
                } else {
                    let endTime = new Date().getTime();
                    let {startTime} = game;
                    player.WPM = calculateWPM(endTime, startTime, player)
                    game = await game.save()
                    socket.emit("done")
                    io.to(gameID).emit("updateGame", game);
                }
            }
        }
    })

    socket.on("timer", async ({ playerId, gameID }) => {
        let countDown = 5;
        let game = await Game.findById(gameID);
        let player = game.players.id(playerId);
        if (player.isPartyLeader) {
            let timerId = setInterval(async () => {
                if (countDown >= 0) {
                    io.to(gameID).emit("timer", { countDown, msg: "Game Starting" })
                    countDown--;
                } else {
                    game.isJoin = false;
                    game = await game.save()
                    io.to(gameID).emit("updateGame", game)
                    startGameClock(gameID)
                    clearInterval(timerId)
                }
            }, 1000)
        }
    })

    socket.on("create-game", async (nickname) => {
        try {
            let game = new Game();
            const sentence = await getSentence()
            game.words = sentence
            let player = {
                socketID: socket.id,
                nickname,
                isPartyLeader: true,
            }
            game.players.push(player)
            game = await game.save()

            const gameId = game._id.toString()
            socket.join(gameId);
            io.to(gameId).emit("updateGame", game)
        } catch (err) {
            console.log(err)
        }
    })

    socket.on("join-game", async ({ nickname, gameId }) => {
        try {
            let game = await Game.findById(gameId);
            if (game.isJoin) {
                const id = game._id.toString()
                let player = {
                    nickname,
                    socketID: socket.id,
                }
                socket.join(id);
                game.players.push(player)
                game = await game.save()
                io.to(gameId).emit("updateGame", game);
            }
        } catch (err) {
            console.log(err);
        }
    })
})

const startGameClock = async (gameID) => {
    let game = await Game.findById(gameID);
    game.startTime = new Date().getTime();
    game = await game.save()
    let time = 120;
    // there is a noticeable delay so execute it immediately
    let timerId = setInterval(function gameIntervalFunc() {
        if(time>=0) {
            const timeFormat = calculateTime(time);
            io.to(gameID).emit("timer", {countDown: timeFormat, msg: "Time Remaining"})
            time--;
        } else {
            (async () => {
                try {
                    let endTime = new Date().getTime();
                    let game = await Game.findById(gameID);
                    let {startTime} = game;
                    game.isOver = true;
                    game.players.forEach((player, index) => {
                        if(player.WPM === -1)
                            game.players[index].WPM = calculateWPM(endTime, startTime, player)
                    })
                    game = await game.save()
                    io.to(gameID).emit("updateGame", game);
                    clearInterval(timerId)
                } catch(err) {
                    console.log(err)
                }
                
            })()
        }
        return gameIntervalFunc
    }(), 1000);
}

const calculateTime = (time) => {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    return `${min}:${sec < 10 ? "0" + sec : sec}`
}

const calculateWPM = (endTime, startTime, player) => {
    // 40 wpm -> 60/1.5
    const timeTakenInSec = (endTime - startTime) / 1000;
    const timeTaken = timeTakenInSec/60;
    let wordsTyped = player.currentWordIndex;
    const WPM = Math.floor(wordsTyped/timeTaken)
    return WPM
}
