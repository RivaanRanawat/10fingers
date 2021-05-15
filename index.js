const express = require("express");
const mongoose = require("mongoose");
const socketio = require("socket.io");

const app = express()
const server = app.listen(3001);
const io = socketio(server);

mongoose.connect("mongodb://localhost:27017/typeRacingClone", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to database")
})