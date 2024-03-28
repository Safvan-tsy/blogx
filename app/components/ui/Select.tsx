import React from "react";

type SelectProps = {
  options: string[];
  onChange: (value: string) => void;
  title?: string;
};

const Select = ({ options, onChange, title }: SelectProps) => {
  return (
    <label className="form-control w-full max-w-xs">
      {title && (
        <div className="label">
          <span className="label-text">{title}</span>
        </div>
      )}
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
