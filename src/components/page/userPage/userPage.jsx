import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import api from "../../../api";
import PropTypes from "prop-types";
import UserProfile from "../../ui/userProfile/userCard";
import Comments from "../../ui/userProfile/comments";
import QualitiesCard from "../../ui/userProfile/qualitiesCard";
import MeetingsCard from "../../ui/userProfile/meetingsCard";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [requiredUser, setRequiredUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setRequiredUser(data));
    }, []);

    const editUser = (userId) => {
        history.push(history.location.pathname + "/edit");
    };

    if (requiredUser) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3 ">
                        <UserProfile
                            requiredUser={requiredUser}
                            editUserButton={editUser}
                            userId={userId}
                        />
                        <QualitiesCard qualities={requiredUser.qualities} />
                        <MeetingsCard
                            completeMeeting={requiredUser.completedMeetings}
                        />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading...</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
