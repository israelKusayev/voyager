import React from 'react';
import Input from './elements/input';
import DatePicker from './elements/datePicker';

const WorkplaceFrom = ({ data, error, onChange, index }) => {
  return (
    <div className='workplace-form'>
      <Input
        name='name'
        label='Name'
        value={data.name}
        error={error && error.name}
        onChange={e => onChange(e, index)}
        onBlur={e => onChange(e, index)}
        required={true}
      />
      <DatePicker
        name='start'
        label='Start date'
        value={data.start}
        error={error && error.start}
        required={true}
        onChange={e => onChange(e, index)}
        onBlur={e => onChange(e, index)}
      />
      <DatePicker
        name='end'
        label='End date'
        value={data.end}
        error={error && error.end}
        required={true}
        onChange={e => onChange(e, index)}
        onBlur={e => onChange(e, index)}
      />
    </div>
  );
};

export default WorkplaceFrom;
