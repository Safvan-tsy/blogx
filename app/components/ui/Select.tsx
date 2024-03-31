import React from "react";

type SelectProps = {
  selected: string;
  options: string[];
  onChange: (value: string) => void;
  title?: string;
};

const Select = ({ selected, options, onChange, title }: SelectProps) => {
  return (
    <label className="form-control w-full max-w-xs">
      {title && (
        <div className="label">
          <span className="label-text">{title}</span>
        </div>
      )}
      <select
        className="select select-bordered"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
