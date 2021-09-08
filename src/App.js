import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

function App() {
    const initialState = api.users.fetchAll();
    const [users, setUsers] = useState(initialState);

    const totalPeople = (array) => {
        const renderPhrase = (number, titles) => {
            const cases = [2, 0, 1, 1, 1, 2];
            return titles[
                number % 100 > 4 && number % 100 < 20
                    ? 2
                    : cases[number % 10 < 5 ? number % 10 : 5]
            ];
        };
        if (array.length > 0) {
            return `${array.length} человек 
                    ${renderPhrase(array.length, [
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
            <SearchStatus
                numberOfPeople={totalPeople(users)}
                {...users}
            ></SearchStatus>
            <Users
                onDelete={handleDelete}
                users={users}
                toggleBookmark={handleToggleBookMark}
            />
        </>
    );
}

export default App;
