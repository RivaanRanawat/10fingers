import React,{useEffect} from "react";
import {Router, Route, Switch} from "react-router-dom";
import socket from "./socketConfig";
import GameMenu from "./components/GameMenu";
import history from "./history";

function App() {

  useEffect(() => {
    socket.on("test", msg => {
      console.log(msg)
    })
  }, [])

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={GameMenu}/>
      </Switch>
    </Router>
  );
}

export default App;
