import React,{useEffect, useState} from "react";
import {Router, Route, Switch} from "react-router-dom";
import socket from "./socketConfig";
import GameMenu from "./components/GameMenu";
import history from "./history";
import CreateGame from "./components/CreateGame";

function App() {
  const [gameState, setGameState] = useState({_id: "", players:[], isJoin: false, words:[]})
  useEffect(() => {
    socket.on("updateGame", (game) => {
      console.log(game);
      setGameState(game)
    })
    return () => {
      socket.removeAllListeners()
    }
  }, [])

  // in different hook because setGameState is asynchronous.
  useEffect(() => {
    if(gameState._id !== "") {
      history.push(`/game/${gameState._id}`)
    }
  }, [gameState._id])

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={GameMenu}/>
        <Route exact path="/game/create" component={CreateGame}/>
      </Switch>
    </Router>
  );
}

export default App;
