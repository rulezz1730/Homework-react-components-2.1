import React from "react";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import { useParams } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage/editUserPage";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const params = useParams();

    const { userId, edit } = params;

    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        <EditUserPage />
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

export default Users;
