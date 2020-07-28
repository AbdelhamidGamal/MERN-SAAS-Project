// SurveyNew shows SurveyForm and SurveyFormReview
import React, { useState } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

function SurveyNew() {
  const [viewFormReviw, setViewFormReviw] = useState(false);

  if (viewFormReviw) {
    return (
      <div>
        <SurveyFormReview onCancel={() => setViewFormReviw(false)} />
      </div>
    );
  }

  return (
    <div>
      <SurveyForm onSurveySubmit={() => setViewFormReviw(true)} />
    </div>
  );
}

export default reduxForm({
  form: 'surveyForm',
})(SurveyNew);
