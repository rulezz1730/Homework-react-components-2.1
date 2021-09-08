import React from "react";
import "bootstrap/dist/css/bootstrap.css";
// import api from "../api";
import Bookmark from "./bookmark";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";

const User = ({
    _id,
    name,
    qualities,
    completedMeetings,
    rate,
    profession,
    onDelete,
    toggleBookmark2,
    ...user
}) => {
    return (
        <tr id={_id}>
            <td>{name}</td>
            <td>
                <Qualitie qualities={qualities} />
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}</td>
            <td>
                <Bookmark
                    toggleBookmark3={toggleBookmark2}
                    userId={_id}
                    status={user.status}
                />
                {/*  */}
            </td>
            <td>
                <button
                    className={`badge bg-danger`}
                    onClick={() => onDelete(_id)}
                >
                    delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    profession: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    toggleBookmark2: PropTypes.func.isRequired
};

export default User;
