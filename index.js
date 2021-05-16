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
    socket.on("create-game", async (nickname) => {
        try{
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
        } catch(err) {
            console.log(err)
        }
    })
})