import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import api from "../api";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const renderPhrase = (number, titles) => {
        let cases = [2, 0, 1, 1, 1, 2];
        return titles[
            number % 100 > 4 && number % 100 < 20
                ? 2
                : cases[number % 10 < 5 ? number % 10 : 5]
        ];
    };

    const handleDelete = (itemId) => {
        setUsers(users.filter((userItem) => userItem._id !== itemId));
    };

    const colorOfPeoplesForCompany = users.length > 0 ? "primary" : "danger";
    const howMuchPeople = (array) => {
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

    function renderUsers(usersArray) {
        return (
            <tbody>
                {users.map((user) => {
                    return (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>
                                {user.qualities.map((q) => (
                                    <span
                                        className={`badge m-2 bg-${q.color}`}
                                        key={q._id}
                                    >
                                        {q.name}
                                    </span>
                                ))}
                            </td>
                            <td>{user.profession.name}</td>
                            <td>{user.completedMeetings}</td>
                            <td>{user.rate}</td>
                            <td>
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className={`badge bg-danger`}
                                >
                                    delete
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        );
    }

    return (
        <>
            <h1>
                <span className={`badge m-2 bg-${colorOfPeoplesForCompany}`}>
                    {howMuchPeople(users)}
                </span>
            </h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился,раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                {renderUsers(users)}
            </table>
        </>
    );
};

export default Users;
