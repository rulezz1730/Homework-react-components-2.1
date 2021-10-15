import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [requiredUser, setrequiredUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setrequiredUser(data));
    });

    const returnAllUsers = () => {
        history.push("/users");
    };

    const editUser = (userId) => {
        history.push(`/users/${userId}/edit`);
    };

    if (requiredUser) {
        return (
            <div>
                <h1>{requiredUser.name}</h1>
                <h2>Профессия: {requiredUser.profession.name}</h2>
                <Qualities qualities={requiredUser.qualities} />
                <p>completedMeetings : {requiredUser.completedMeetings}</p>
                <h2>Rate: {requiredUser.rate}</h2>
                <button onClick={returnAllUsers}>Все Пользователи</button>
                {/* <Link></Link> */}
                <button onClick={() => editUser(userId)}>Изменить</button>
            </div>
        );
    }
    return <h3>Loading...</h3>;
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
