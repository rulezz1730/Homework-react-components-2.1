import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const NavProfile = () => {
    const { currentUser } = useAuth();
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };

    // const handleClick = () => console.log(currentUser._id);

    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <p>{currentUser.name}</p>
                <img
                    src={currentUser.image}
                    className="img-responsive rounded-circle shadow-1-strong me-3"
                    alt="avatar"
                    height="40"
                />
            </div>
            <div className={`w-100 dropdown-menu ${isOpen ? "show" : ""}`}>
                <Link
                    to={`/users/${currentUser._id}/`}
                    className="dropdown-item"
                    // onClick={handleClick}
                >
                    Profile
                </Link>
                <Link to="/logout" className="dropdown-item">
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
