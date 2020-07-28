import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import SurveyNew from './surveys/SurveyNew';
import Thanks from './Thanks';
import Dashboard from './Dashboard';

const App = ({ handleFetchUser }) => {
  useEffect(() => {
    handleFetchUser();
  }, [handleFetchUser]);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/surveys' component={Dashboard} />
        <Route exact path='/surveys/new' component={SurveyNew} />
        <Route path='/surveys/thanks' component={Thanks} />
      </Switch>
    </BrowserRouter>
  );
};

export default connect(null, actions)(App);
