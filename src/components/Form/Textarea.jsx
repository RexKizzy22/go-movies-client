import React from "react";

const Textarea = ({ name, value, handleChange, label }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        id={name}
        rows="3"
        className="form-control"
        onChange={handleChange}
      />
    </div>
  );
};

export default Textarea;
