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
    socket.emit("test", "from server");
})