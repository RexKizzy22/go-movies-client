import React from "react";

const Input = ({name, type, handleChange, label}) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          // value={value}
          className="form-control"
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default Input;
