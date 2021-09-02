import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

function App() {
    const initialState = api.users.fetchAll();
    const [users, setUsers] = useState(initialState);

    const totalPeople = (array) => {
        const renderPhrase = (number, titles) => {
            let cases = [2, 0, 1, 1, 1, 2];
            return titles[
                number % 100 > 4 && number % 100 < 20
                    ? 2
                    : cases[number % 10 < 5 ? number % 10 : 5]
            ];
        };
        if (array.length > 0) {
            return `${array.length} человек ${" "}
                    ${renderPhrase(array.length, [
                        "тусанет",
                        "тусанут",
                        "тусанут",
                    ])}${" "}
                    c тобой сегодня`;
        } else {
            return `Никто с тобой сегодня не тусанет`;
        }
    };

    const handleDelete = (itemId) => {
        setUsers(users.filter((userItem) => userItem._id !== itemId));
        console.log("item ID ", itemId);
    };

    const handleToggleBookMark = (e, itemId) => {
        console.log(itemId);
        const { target } = e;
        if (target.classList.contains("bi", "bi-bookmark")) {
            target.classList.toggle("bi-bookmark");
            target.classList.add("bi-bookmark-fill");
        } else {
            target.classList.toggle("bi-bookmark-fill");
            target.classList.add("bi-bookmark");
        }
    };

    return (
        <>
            <SearchStatus
                numberOfPeople={totalPeople(users)}
                {...users}
            ></SearchStatus>
            <Users
                onDelete={handleDelete}
                arrayUsers={users}
                toggleBookmark={handleToggleBookMark}
            />
        </>
    );
}

export default App;
