import React from 'react';

const Input = ({ label, name, onChange, onBlur, value, error, type = 'text', autoFocus = false, required = false }) => {
  return (
    <div className=''>
      <label htmlFor={name}>
        {required ? <span className='text-red'>* </span> : ''}
        {label}
      </label>
      <input
        className={error ? 'input-error' : ''}
        type={type}
        id={name}
        name={name}
        value={value}
        autoFocus={autoFocus}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div className='error'>{error}</div>
    </div>
  );
};

export default Input;
