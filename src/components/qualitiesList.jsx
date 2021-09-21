import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";

const QualitiesList = ({ qualities }) => {
    return <Qualitie qualities={qualities} />;
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
