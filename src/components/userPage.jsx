import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import api from "../api";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [requiredUser, setrequiredUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setrequiredUser(data));
    });

    const returnAllUsers = () => {
        history.push("/users");
    };

    if (requiredUser) {
        return (
            <div>
                <h1>{requiredUser.name}</h1>
                <h2>Профессия: {requiredUser.profession.name}</h2>
                <Qualitie qualities={requiredUser.qualities} />
                <p>completedMeetings : {requiredUser.completedMeetings}</p>
                <h2>Rate: {requiredUser.rate}</h2>
                <button onClick={returnAllUsers}>Все Пользователи</button>
            </div>
        );
    }
    return <h3>Loading...</h3>;
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
