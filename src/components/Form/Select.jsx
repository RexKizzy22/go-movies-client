import React from "react";

const Select = ({ name, value, label, handleChange, ratings, placeholder }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="form-select form-control"
        value={value}
        onChange={handleChange}
      >
        <option className="form-select form-control">{placeholder}</option>
        {ratings.map((rating, index) => {
            return (
              <option key={index} className="form-select form-control" value={rating}>
                {rating}
              </option>
            );
        })}
      </select>
    </div>
  );
};

export default Select;
