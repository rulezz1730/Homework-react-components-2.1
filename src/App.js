/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Users from "./layouts/users";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/users/:userId?" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;
