/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";

function App() {
    const [users, setUsers] = useState();

    useEffect(() => {
        console.log(`Запрос пользователей с сервера`);
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const totalPeople = (count) => {
        const renderPhrase = (number, titles) => {
            const cases = [2, 0, 1, 1, 1, 2];
            return titles[
                number % 100 > 4 && number % 100 < 20
                    ? 2
                    : cases[number % 10 < 5 ? number % 10 : 5]
            ];
        };
        if (count > 0) {
            return `${count} человек 
                    ${renderPhrase(count, [
                        "тусанет",
                        "тусанут",
                        "тусанут"
                        // eslint-disable-next-line indent
                    ])}
                    c тобой сегодня`;
        } else {
            return `Никто с тобой сегодня не тусанет`;
        }
    };

    const handleDelete = (itemId) => {
        setUsers(users.filter((userItem) => userItem._id !== itemId));
    };

    const handleToggleBookMark = (itemId) => {
        const newUsers = users.map((user) => {
            if (user._id === itemId) {
                user.status = !user.status;
            }
            return user;
        });
        setUsers(newUsers);
    };

    return (
        <>
            {users && (
                <Users
                    onDelete={handleDelete}
                    users={users}
                    toggleBookmark={handleToggleBookMark}
                    totalPeople={totalPeople}
                />
            )}
        </>
    );
}

export default App;
