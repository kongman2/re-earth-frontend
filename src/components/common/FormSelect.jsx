import React from 'react';
import { Icon } from '@iconify/react';
import './FormSelect.scss';

const FormSelect = ({ 
  label, 
  value, 
  onChange, 
  options = [], 
  placeholder, 
  required = false, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`form-select-wrapper mb-3 ${className}`}>
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      <div className="form-select-container">
        <select
          className="form-select-control"
          value={value}
          onChange={onChange}
          required={required}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon 
          icon="mdi:chevron-down" 
          width={20} 
          height={20}
          className="form-select-icon"
        />
      </div>
    </div>
  );
};

export default FormSelect;