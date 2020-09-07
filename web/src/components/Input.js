import React from "react";

const Input = ({
  name,
  label,
  helpText,
  labelIcon,
  displayType = "",
  onChange,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        <i className={`fas ${labelIcon} mr-2`}></i>
        {label}
      </label>
      <input
        type="text"
        className={`form-control ${displayType}`}
        name={name}
        id={name}
        aria-describedby={name}
        onChange={onChange}
        {...rest}
      />
      <small id={name} className="form-text text-muted">
        {helpText}
      </small>
    </div>
  );
};

export default Input;