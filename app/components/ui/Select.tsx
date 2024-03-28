import React from "react";

type SelectProps = {
  title: string;
  options: string[];
  onChange: (value: string) => void;
};

const Select = ({ title, options, onChange }: SelectProps) => {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{title}</span>
      </div>
      <select
        className="select select-bordered"
        onChange={(e) => onChange(e.target.value)}
      >
        <option selected>All</option>
        {options.map((item) => (
          <option>{item}</option>
        ))}
      </select>
    </label>
  );
};

export default Select;
