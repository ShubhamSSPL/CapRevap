/**
 * FormInput Component
 * Reusable text input with validation
 */

import React from 'react';
import { Input } from 'antd';
import { useFormContext, Controller } from 'react-hook-form';
import './FormInput.css';

interface FormInputProps {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'email' | 'tel' | 'password';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  helpText?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  maxLength,
  helpText,
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
          <Input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            status={error ? 'error' : ''}
            className="form-input"
          />
        )}
      />

      {helpText && !error && <div className="help-text">{helpText}</div>}
      {error && <div className="error-text">{error.message as string}</div>}
    </div>
  );
};
