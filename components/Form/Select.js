import React from "react";

export function  Select ({ options, value, onChange, placeholder }) {
  return (
    <select  onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled defaultValue>
          {placeholder}
        </option>
      {options.map((option) => (
        <option key={option._id} value={option._id}>
          {option.nombre}
        </option>
      ))}
    </select>
  );
};
