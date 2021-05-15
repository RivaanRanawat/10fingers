import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import GameMenu from "./components/GameMenu";
import history from "./history";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={GameMenu}/>
      </Switch>
    </Router>
  );
}

export default App;
