import React from "react";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import { useParams } from "react-router-dom";

const Users = () => {
    const params = useParams();

    const { userId } = params;

    return userId ? <UserPage userId={userId} /> : <UsersListPage />;
};

export default Users;
