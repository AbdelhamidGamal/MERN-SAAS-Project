import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { useHistory } from 'react-router-dom';

import FIELDS from './formFields';

export const SurveyFormReview = ({ values, onCancel, handleCreateSurvey }) => {
  let history = useHistory();
  return (
    <div className='container'>
      <h3>Please confirm your entries</h3>
      <form>
        {FIELDS.map(({ name, label }) => (
          <div key={name}>
            <label>{label}</label>
            <input disabled type='text' value={values[name]} />
          </div>
        ))}
      </form>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className='btn btn-flat red' onClick={onCancel}>
          Back
        </button>
        <button
          onClick={() => handleCreateSurvey(values, history)}
          className='btn teal btn-flat white-text'
        >
          Send Survey
          <i className='material-icons right'>email</i>
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  values: state.form.surveyForm.values,
});

export default connect(mapStateToProps, actions)(SurveyFormReview);
