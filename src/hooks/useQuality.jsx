/* eslint-disable array-callback-return */
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import qualityService from "../service/quality.service";
import { toast } from "react-toastify";

const QualityContext = React.createContext();

export const useQuality = () => {
    return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        getQualitiesList();
    }, []);

    function errorCather(error) {
        const { message } = error.response.data;
        setError(message);
    }

    function getQualities(userQualities) {
        return qualities.filter((qual) => userQualities.includes(qual._id));
    }

    async function getQualitiesList() {
        try {
            const { content } = await qualityService.get();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCather(error);
        }
    }

    return (
        <QualityContext.Provider value={{ isLoading, qualities, getQualities }}>
            {children}
        </QualityContext.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
