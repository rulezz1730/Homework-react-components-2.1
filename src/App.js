/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";
// import EditForm from "./components/ui/editForm";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <ProfessionProvider>
                    <QualityProvider>
                        <Route
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                    </QualityProvider>
                    <Route path="/login/:type?" component={Login} />
                </ProfessionProvider>
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
            <ToastContainer />
        </div>
    );
}

export default App;
