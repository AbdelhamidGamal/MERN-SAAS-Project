// Surveyform shows a form for user to add input
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

import FIELDS from './formFields';

function SurveyForm({ handleSubmit, onSurveySubmit }) {
  function renderFields() {
    return FIELDS.map(({ name, label }) => {
      return (
        <Field
          key={name}
          type='text'
          name={name}
          component={SurveyField}
          label={label}
        />
      );
    });
  }

  return (
    <div className='container' style={{ padding: '1rem 0' }}>
      <h3>Create A New Survey</h3>
      <form onSubmit={handleSubmit(onSurveySubmit)}>
        {renderFields()}

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to='/surveys' className='btn btn-flat red'>
            Cancel
          </Link>
          <button className='btn teal btn-flat white-text'>Next</button>
        </div>
      </form>
    </div>
  );
}

function validate(values) {
  const errors = {};

  FIELDS.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You Must Provide a Value for ${name}`;
    }
  });

  if (values.emails) {
    errors.emails = validateEmails(values.emails);
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(SurveyForm);
