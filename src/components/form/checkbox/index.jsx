import React from "react";

const Checkbox = (props) => {
  const { field, label } = props;
  const { value } = field;

  return (
    <div className="flex items-end">
      <label className="flex items-center block text-sm font-medium mb-1 block text-sm font-medium mb-1">
        <input
          type="checkbox"
          className="form-checkbox"
          {...field}
          checked={value}
        />
        <span className="text-sm ml-2">{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
