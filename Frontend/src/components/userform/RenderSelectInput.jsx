import React from 'react';

const RenderSelectInput = (label, name, onChange, selectedValue, options) => (
    <label>
      {label}
      <div className="renderSelectArea">
        <select name={name} onChange={onChange} value={selectedValue}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </label>
  );

export default RenderSelectInput;
