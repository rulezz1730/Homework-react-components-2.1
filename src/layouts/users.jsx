import React from "react";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import { useParams } from "react-router-dom";
import EditForm from "../components/ui/editForm";

const Users = () => {
    const params = useParams();

    const { userId, edit } = params;

    return (
        <>
            {userId ? (
                edit ? (
                    <EditForm />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
