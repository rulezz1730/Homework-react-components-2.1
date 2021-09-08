import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ qualities }) => {
    return qualities.map((q) => (
        <span className={`badge m-2 bg-${q.color}`} key={q._id}>
            {q.name}
        </span>
    ));
};

export default Qualitie;

Qualitie.propTypes = {
    qualities: PropTypes.array.isRequired
};
