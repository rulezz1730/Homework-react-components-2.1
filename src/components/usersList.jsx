/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import _ from "lodash";
import UsersTable from "./usersTable";

const UsersList = () => {
    const pageSize = 8;
    const [currentPage, setCurrenPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProfession] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

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

    useEffect(() => {
        console.log(`Запрос с сервера`);
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrenPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProfession(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrenPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const filtredUsers = selectedProf
            ? users.filter((user) => _.isEqual(user.profession, selectedProf))
            : users;
        const count = filtredUsers.length;
        const sortedUsers = _.orderBy(
            filtredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedProfession();
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                            selectedItem={selectedProf}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus
                        numberOfPeople={totalPeople(count)}
                        users={users}
                    ></SearchStatus>
                    {count > 0 && (
                        <UsersTable
                            users={usersCrop}
                            toggleBookmark={handleToggleBookMark}
                            selectedSort={sortBy}
                            onSort={handleSort}
                            onDelete={handleDelete}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "Loading...";
};

UsersList.propTypes = {
    onDelete: PropTypes.func,
    toggleBookmark: PropTypes.func,
    users: PropTypes.array,
    totalPeople: PropTypes.func
};

export default UsersList;
