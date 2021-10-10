import React from "react";
// import User from "./user";
import PropTypes from "prop-types";
// import TableHeader from "./tableHeader";
// import TableBody from "./tableBody";
import Bookmark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";

const UsersTable = ({
    users,
    onDelete,
    toggleBookmark,
    selectedSort,
    onSort
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link className="nav-link" to={`/users/${user._id}`}>
                    {user.name}
                </Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualities={user.qualities} />
        },
        profession: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        status: {
            path: "status",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    toggleBookmark3={toggleBookmark}
                    userId={user._id}
                    status={user.status}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    className={`btn btn-danger`}
                >
                    delete
                </button>
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func,
    toggleBookmark: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired
};

export default UsersTable;
