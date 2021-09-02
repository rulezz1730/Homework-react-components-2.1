import React from "react";

const SearchStatus = ({ numberOfPeople, ...users }) => {
    const colorOfPeoplesForCompany = users.length > 0 ? "primary" : "danger";

    return (
        <h1>
            <span className={`badge m-2 bg-${colorOfPeoplesForCompany}`}>
                {numberOfPeople}
            </span>
        </h1>
    );
};

export default SearchStatus;
