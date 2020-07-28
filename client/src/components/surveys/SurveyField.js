import React from 'react';

const SurveyField = ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} type='text' />
      {touched && error && (
        <p
          style={{ marginTop: '0', paddingTop: '0', marginBottom: '2rem' }}
          className='red-text'
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default SurveyField;
