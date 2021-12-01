import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import professionService from "../service/profession.service";
import { toast } from "react-toastify";

const PropfessionContext = React.createContext();

export const useProfession = () => {
    return useContext(PropfessionContext);
};

export const ProfessionProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [professions, setProfessions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        getProfessionsList();
    }, []);

    function errorCather(error) {
        const { message } = error.response.data;
        setError(message);
    }

    function getProfession(id) {
        return professions.find((p) => {
            return p._id === id;
        });
    }

    async function getProfessionsList() {
        try {
            const { content } = await professionService.get();
            console.log(content);
            setProfessions(content);
            setLoading(false);
        } catch (error) {
            errorCather(error);
        }
    }

    return (
        <PropfessionContext.Provider
            value={{ isLoading, professions, getProfession }}
        >
            {children}
        </PropfessionContext.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
