import React from "react";

const Bookmark = ({ userId, status, toggleBookmark3, ...rest }) => {
    return (
        <>
            <button
                onClick={(e) => toggleBookmark3(e, userId)}
                className="bi bi-bookmark"
            ></button>
        </>
    );
};

export default Bookmark;
