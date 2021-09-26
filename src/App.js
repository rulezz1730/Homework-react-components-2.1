/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./components/layouts/main";
import NavBar from "./components/navBar";
import Login from "./components/layouts/login";
import Users from "./components/layouts/users";
// import UserPage from "./components/userPage";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users} />
            </Switch>
            {/* <Users /> */}
            {/* <UserPage /> */}
        </div>
    );
}

export default App;
