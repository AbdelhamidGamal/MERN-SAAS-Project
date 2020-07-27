import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions';

function SurveyNew({ handleFetchUser }) {
  let history = useHistory();
  const [values, setValues] = useState({
    title: '',
    subject: '',
    body: '',
    recipients: '',
  });

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    await axios.post('/api/surveys', values);
    handleFetchUser();
    history.push('/surveys');
  }

  return (
    <div className='container center' style={{ maxWidth: '700px' }}>
      <form onSubmit={handleSubmit}>
        <div className='input-field'>
          <h5>Title</h5>
          <input
            id='title'
            name='title'
            value={values.title}
            type='text'
            className='validate'
            onChange={handleInputChange}
          />
        </div>
        <div className='input-field '>
          <h5>Subject</h5>
          <input
            id='subject'
            name='subject'
            type='text'
            value={values.subject}
            className='validate'
            onChange={handleInputChange}
          />
        </div>
        <div className='input-field '>
          <h5>Body</h5>
          <input
            id='body'
            name='body'
            type='text'
            value={values.body}
            className='validate'
            onChange={handleInputChange}
          />
        </div>
        <div className='row'>
          <div className='input-field'>
            <h5>Recipients</h5>
            <textarea
              id='recipients'
              name='recipients'
              value={values.recipients}
              className='materialize-textarea'
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
        <button className='btn btn-large red'>Submit</button>
      </form>
    </div>
  );
}

export default connect(null, actions)(SurveyNew);
