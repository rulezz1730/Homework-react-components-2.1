/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";

const Qualitie = ({ qualities }) => {
    const { getQualities } = useQuality();
    const filtredQualities = getQualities(qualities);

    return filtredQualities.map((qual) => (
        <span className={`badge m-2 bg-${qual.color}`} key={qual._id}>
            {qual.name}
        </span>
    ));
};

export default Qualitie;

Qualitie.propTypes = {
    qualities: PropTypes.array.isRequired
};
