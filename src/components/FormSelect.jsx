import React from "react";
import { capitalizeFirstLetter } from "../utils/utils";

const FormSelect = ({ id, name, selected, options, label, defaultValue, width = "w-full" }) => {
  return (
    <label className={`form-control ${width} max-w-xs`}>
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select
        id={id ? id : name}
        name={name}
        className="select select-bordered"
        defaultValue={defaultValue}
      >
        {options.map((option) => (
          <option key={option} value={option} >
            {capitalizeFirstLetter(option)}
          </option>
        ))}
      </select>
    </label>
  );
};

export default FormSelect;
