import React from 'react';
import Input from './elements/input';
import WorkplaceFrom from './workplaceFrom';

const WorkplacesForm = ({ data, errors, onChange, onSubmit, onWorkplaceChange, onAddWorkplace, isFormValid }) => {
  return (
    <form className='workplaces-form' onSubmit={onSubmit}>
      <div className='personal-data-container'>
        <Input
          name={'firstName'}
          label={'First name'}
          value={data.firstName}
          onChange={onChange}
          onBlur={onChange}
          required={true}
          autoFocus={true}
          error={errors.firstName}
        />
        <Input
          name={'lastName'}
          label={'Last name'}
          value={data.lastName}
          onChange={onChange}
          onBlur={onChange}
          required={true}
          error={errors.lastName}
        />
      </div>
      <div className='workplaces-header'>
        <h2 className='header'>Workplaces</h2>
        <button disabled={data.workplaces.length === 10} onClick={onAddWorkplace}>
          Add workplace
        </button>
      </div>
      {data.workplaces.map((workplace, i) => (
        <WorkplaceFrom
          key={i}
          index={i}
          data={workplace}
          onChange={onWorkplaceChange}
          error={errors.workplaces ? errors.workplaces[i] : null}
        />
      ))}
      <input type='submit' value='Save' disabled={!isFormValid} />
    </form>
  );
};

export default WorkplacesForm;
