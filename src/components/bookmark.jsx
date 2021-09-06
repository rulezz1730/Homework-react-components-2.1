import React from "react";

const Bookmark = ({ userId, status, toggleBookmark3 }) => {
    console.log(status);
    return (
        <>
            <button
                onClick={() => toggleBookmark3(userId)}
                className={"bi bi-bookmark" + (status ? "-fill" : "")}
            ></button>
        </>
    );
};

export default Bookmark;
