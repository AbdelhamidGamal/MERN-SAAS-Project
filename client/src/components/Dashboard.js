import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleFetchSurveys } from '../actions';

function Dashboard({ surveys, handleFetchSurveys }) {
  useEffect(() => {
    handleFetchSurveys();
  }, []);

  return (
    <div className='container'>
      <div>
        <button
          style={{ padding: '0 1rem', marginTop: '1rem', marginLeft: '1rem' }}
          className='btn white-text blue'
        >
          <Link className='white-text' to='/surveys/new'>
            Create A Survey
          </Link>
        </button>
      </div>
      <div className='row'>
        {surveys &&
          surveys.reverse().map((survey) => {
            return (
              <div key={survey._id}>
                <div className='col s12'>
                  <div className='card blue-grey darken-1'>
                    <div className='card-content white-text'>
                      <span className='card-title'>{survey.title}</span>
                      <p>{survey.body}</p>
                      <p className='right'>
                        Sent Date: {new Date(survey.dataSent).toDateString()}
                      </p>
                      <div className='card-action'>
                        <p>Yes : {survey.yes}</p>
                        <p>no : {survey.no}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default connect((state) => ({ surveys: state.surveys }), {
  handleFetchSurveys,
})(Dashboard);
