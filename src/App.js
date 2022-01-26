/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./app/components/ui/navBar";
import Main from "./app/layouts/main";
import Login from "./app/layouts/login";
import Users from "./app/layouts/users";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./app/hooks/useAuth";
import ProtectedRoute from "./app/components/common/protectedRoute";
import LogOut from "./app/layouts/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./app/store/qualities";
import { loadProfessionsList } from "./app/store/professions";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
    }, []);

    return (
        <div>
            <AuthProvider>
                <NavBar />
                {/* <ProfessionProvider> */}
                <Switch>
                    <ProtectedRoute
                        path="/users/:userId?/:edit?"
                        component={Users}
                    />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/" exact component={Main} />
                    <Redirect to="/" />
                </Switch>
                {/* </ProfessionProvider> */}
            </AuthProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
