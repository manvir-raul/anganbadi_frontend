import React from "react";

const Select = () => {
  return (
    <div>
      <h2 className="text-2xl text-slate-800 font-bold mb-6">Select</h2>
      <label className="block text-sm font-medium mb-1" htmlFor="country">
        Country
      </label>
      <select id="country" className="form-select">
        <option>Italy</option>
        <option>USA</option>
        <option>United Kingdom</option>
      </select>
    </div>
  );
};
