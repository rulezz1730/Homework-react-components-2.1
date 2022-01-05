import React from "react";
import { useHistory } from "react-router";
// import api from "../../../api";
import PropTypes from "prop-types";
import UserProfile from "../../ui/userProfile/userCard";
import Comments from "../../ui/userProfile/comments";
import QualitiesCard from "../../ui/userProfile/qualitiesCard";
import MeetingsCard from "../../ui/userProfile/meetingsCard";
import { useUser } from "../../../hooks/useUsers";
import CommentsProvider from "../../../hooks/useComments";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const { getUserById } = useUser();
    const user = getUserById(userId);
    // const [requiredUser, setRequiredUser] = useState();

    // useEffect(() => {
    //     api.users.getById(userId).then((data) => setRequiredUser(data));
    // }, []);

    const editUser = (userId) => {
        history.push(`${history.location.pathname}edit/`);
    };

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3 ">
                        <UserProfile
                            requiredUser={user}
                            editUserButton={editUser}
                            userId={userId}
                        />
                        <QualitiesCard qualities={user.qualities} />
                        <MeetingsCard
                            completeMeeting={user.completedMeetings}
                        />
                    </div>
                    <div className="col-md-8">
                        <CommentsProvider>
                            <Comments />
                        </CommentsProvider>
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
