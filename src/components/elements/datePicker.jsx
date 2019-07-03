import React from 'react';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
const DatePicker = ({ label, name, onChange, onBlur, value, error, required = false }) => {
  return (
    <div>
      <label htmlFor={name}>
        {required ? <span className='text-red'>* </span> : ''}
        {label}
      </label>
      <ReactDatePicker
        className={error ? 'input-error' : ''}
        selected={value}
        onChange={e => onChange({ target: { name: name, value: moment(e).toDate() } })}
        onBlur={e =>
          onBlur({
            target: { name: name, value: moment(e.target.value).isValid() ? moment(e.target.value).toDate() : null }
          })
        }
      />

      <div className='error'>{error}</div>
    </div>
  );
};

export default DatePicker;
