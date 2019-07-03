import joi from 'joi';

export const workplacesSchema = {
  name: joi.string().required(),
  start: joi
    .date()
    .iso()
    .required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case 'date.isoDate':
            err.message = '"Start date" must be valid date!';
            break;

          default:
            break;
        }
      });
      return errors;
    }),
  end: joi
    .date()
    .iso()
    .min(joi.ref('start'))
    .required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case 'date.isoDate':
            err.message = '"End date" must be valid date!';
            break;
          case 'date.min':
            err.message = `"End date" must be larger than start date!`;
            break;
          case 'date.ref':
            err.message = `Select "start date"`;
            break;
          default:
            break;
        }
      });
      return errors;
    })
};

const workplace = joi.object().keys(workplacesSchema);

export const appSchema = {
  firstName: joi
    .string()
    .required()
    .label('First name'),
  lastName: joi
    .string()
    .required()
    .label('Last name'),
  workplaces: joi.array().items(workplace)
};
