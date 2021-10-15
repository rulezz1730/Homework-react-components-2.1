/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, value }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName].name,
                  // eslint-disable-next-line react/prop-types
                  value: options[optionName]._id
              }))
            : options;

    const handleChange = (value) => {
        onChange({ name: name, value: value });
    };
    // if (value) {
    //     value.every((v) => handleChange(v));
    // }

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
                value={value}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.array
};

export default MultiSelectField;
