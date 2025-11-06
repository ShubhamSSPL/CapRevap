/**
 * FormSelect Component
 * Reusable dropdown select with validation
 */

import React from 'react';
import { Select } from 'antd';
import { useFormContext, Controller } from 'react-hook-form';
import './FormInput.css';

interface Option {
  value: string | number;
  label: string;
}

interface FormSelectProps {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  helpText?: string;
  allowClear?: boolean;
  showSearch?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  placeholder,
  required = false,
  disabled = false,
  helpText,
  allowClear = true,
  showSearch = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className="form-field">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="required-asterisk">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            id={name}
            placeholder={placeholder}
            disabled={disabled}
            allowClear={allowClear}
            showSearch={showSearch}
            status={error ? 'error' : ''}
            className="form-input"
            options={options}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          />
        )}
      />

      {helpText && !error && <div className="help-text">{helpText}</div>}
      {error && <div className="error-text">{error.message as string}</div>}
    </div>
  );
};
