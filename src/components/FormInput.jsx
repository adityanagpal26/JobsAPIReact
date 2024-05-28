import React from "react";

const FormInput = ({ label, id, name, defaultValue, placeholder, type, width }) => {
  return (
    <>
      <label className="form-control w-full">
        {label && (
          <div className="label">
            <span className="label-text text-md">{label}</span>
          </div>
        )}
        <input
          id={id ? id : name}
          name={name}
          type={type || "text"}
          placeholder={placeholder || "Type here"}
          className={`input input-bordered ${width || "w-full"}`}
          defaultValue={defaultValue}
        />
      </label>
    </>
  );
};

export default FormInput;
