/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import _ from "lodash";

const Users = ({ onDelete, users: allUsers, toggleBookmark, totalPeople }) => {
    const pageSize = 5;
    const [currentPage, setCurrenPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProfession] = useState();

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

    let filtredUsers;
    let usersCrop;
    let count;
    if (allUsers && allUsers.length) {
        filtredUsers = selectedProf
            ? allUsers.filter((user) =>
                  _.isEqual(user.profession, selectedProf)
              )
            : allUsers;
        count = filtredUsers.length;
        usersCrop = paginate(filtredUsers, currentPage, pageSize);
    }
    // ? allUsers.filter((user) => user.profession === selectedProf)
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
                    users={allUsers}
                ></SearchStatus>
                {count > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Профессия</th>
                                <th scope="col">Встретился,раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersCrop.map((user) => (
                                <User
                                    key={user._id}
                                    onDelete={onDelete}
                                    toggleBookmark2={toggleBookmark}
                                    {...user}
                                />
                            ))}
                        </tbody>
                    </table>
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
};

Users.propTypes = {
    onDelete: PropTypes.func.isRequired,
    toggleBookmark: PropTypes.func.isRequired,
    users: PropTypes.array,
    totalPeople: PropTypes.func.isRequired
};

export default Users;
