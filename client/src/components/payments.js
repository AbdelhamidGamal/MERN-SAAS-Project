import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

function Payments({ handleToken }) {
  return (
    <StripeCheckout
      name='Emaily'
      description='Buy 5 Emaily Credits'
      amount={500}
      token={(token) => handleToken(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <button className='btn blue darken-4'>Add Credits</button>
    </StripeCheckout>
  );
}

export default connect(null, actions)(Payments);
