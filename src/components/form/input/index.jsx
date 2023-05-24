import React from "react";

const Input = ({ label, name, register, type = "text" }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1" htmlFor="default">
        {label}
      </label>
      <input className="form-input w-full" type={type} {...register(name)} />
    </div>
  );
};

export default Input;
