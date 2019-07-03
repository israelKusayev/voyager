import React, { Component } from 'react';
import { toast } from 'react-toastify';
import joi from 'joi';
import { appSchema, workplacesSchema } from './appSchema';
import WorkplacesForm from './components/workplacesForm';

class App extends Component {
  state = {
    data: {
      firstName: '',
      lastName: '',
      workplaces: [{ name: '', start: null, end: null }]
    },
    errors: {
      workplaces: []
    },
    isFormValid: false
  };

  addWorkplace = e => {
    e.preventDefault();

    const { data } = this.state;
    data.workplaces.push({ name: '', start: null, end: null });
    this.setState({ data, isFormValid: false });
  };

  // Validate the entire form
  validate = () => {
    const options = { abortEarly: false };
    const { error } = joi.validate(this.state.data, appSchema, options);

    this.setState({ isFormValid: !error });
  };

  // validate specific field
  validateProperty = (schema, property, obj = undefined) => {
    const { name, value } = property;
    if (!obj) obj = { [name]: value };

    const schemaField = { [name]: schema[name] };

    const { error } = joi.validate(obj, schemaField, { allowUnknown: true });
    return error ? error.details[0].message : null;
  };

  // Validate that end date is larger than or equal to start date
  validateEndDate = (schema, property, start) => {
    const obj = { [property.name]: property.value, start };
    return this.validateProperty(schema, property, obj);
  };

  validateWorkplace = data => {
    return this.validateProperty(workplacesSchema, data);
  };

  // handle input change
  handleChange = ({ target }) => {
    this.validate();

    let { data, errors } = this.state;

    const errorMessage = this.validateProperty(appSchema, target);
    if (errorMessage) errors[target.name] = errorMessage;
    else delete errors[target.name];

    data[target.name] = target.value;
    this.setState({ data, errors });
  };

  // handle input of workspce change
  handleWorkplaceChange = ({ target }, index) => {
    this.validate();

    const { data, errors } = this.state;
    const { name, value } = target;
    const workplace = data.workplaces[index];
    let workplaceErrors = errors.workplaces[index];

    if (name === 'start' && workplace.end) this.validateEndWhenClickOnStart(workplace.end, value, workplaceErrors);

    let errorMessage;
    if (name === 'end') errorMessage = this.validateEndDate(workplacesSchema, target, workplace.start);
    else errorMessage = this.validateWorkplace(target);

    if (errorMessage) {
      if (!workplaceErrors) workplaceErrors = {};
      workplaceErrors[name] = errorMessage;
    } else if (workplaceErrors) delete workplaceErrors[name];

    errors.workplaces[index] = workplaceErrors;
    workplace[name] = value;
    this.setState({ data, errors });
  };

  validateEndWhenClickOnStart(end, start, workplaceErrors) {
    const errorMessage = this.validateEndDate(workplacesSchema, { name: 'end', value: end }, start);
    if (errorMessage) {
      if (!workplaceErrors) workplaceErrors = {};
      workplaceErrors.end = errorMessage;
    } else if (workplaceErrors) delete workplaceErrors.end;
  }

  handleSubmit = e => {
    e.preventDefault();
    toast('Your data saved successfully!!');
  };

  render() {
    const { data, errors, isFormValid } = this.state;
    return (
      <div className='container'>
        <h1>Workplaces Form</h1>
        <WorkplacesForm
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onAddWorkplace={this.addWorkplace}
          onWorkplaceChange={this.handleWorkplaceChange}
          data={data}
          errors={errors}
          isFormValid={isFormValid}
        />
      </div>
    );
  }
}
export default App;
