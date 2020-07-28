// Surveyform shows a form for user to add input
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
  { name: 'title', label: 'Survey Title' },
  { name: 'subject', label: 'Survey Subject' },
  { name: 'body', label: 'Survey Body' },
  { name: 'emails', label: 'Recipient List' },
];

function SurveyForm({ handleSubmit }) {
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
      <form onSubmit={handleSubmit((values) => console.log(values))}>
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

  FIELDS.map(({ name }) => {
    if (!values[name]) {
      errors[name] = `You Must Provide a Value for ${name}`;
    }
  });

  if (values.emails) {
    errors.emails = validateEmails(values.emails);
  }

  return errors;
}

export default reduxForm({ validate, form: 'surveyForm' })(SurveyForm);
