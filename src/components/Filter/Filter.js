import React from "react";
import PropTypes from 'prop-types';
import './Filter.css';

function Filter({ value, onChangeFilter }) {
    return (
        <div className="Filter">
            <h2 className="FilterName">Find contacts by name</h2>
            <input className="FilterInput"
                type="text"
                placeholder="Enter name"
                value={value}
                onChange={(e) => onChangeFilter(e.target.value)}
            />
        </div>
    );
};

Filter.propTypes = {
    value: PropTypes.string,
    onChangeFilter: PropTypes.func.isRequired
};

export default Filter;