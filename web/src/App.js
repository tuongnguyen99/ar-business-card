import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Main from "./screens/Main";
import Login from "./screens/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/home">
            <Main />
          </Route>
        </Switch>
        <ToastContainer position="bottom-right" pauseOnHover />
      </Router>
    </div>
  );
}

export default App;
