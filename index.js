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

    socket.on("timer", async ({ playerId, gameID }) => {
        let countDown = 5;
        let game = await Game.findById(gameID);
        let player = game.players.id(playerId);
        if (player.isPartyLeader) {
            let timerId = setInterval(async () => {
                if(countDown>=0) {
                    io.to(gameID).emit("timer", { countDown, msg: "Game Starting" })
                    countDown--;
                } else {
                    game.isOpen = false;
                    game = await game.save()
                    socket.to(gameID).emit("updateGame", game)
                    // startGameClock(gameId)
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