import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Payments from './payments';

function Header({ user }) {
  return (
    <header>
      <nav>
        <div className='nav-wrapper grey darken-4'>
          <div className='container'>
            <Link to={user ? '/surveys' : '/'} className='brand-logo left'>
              FeedBacker
            </Link>
            <ul className='right'>
              {user === null ? (
                ''
              ) : user ? (
                <React.Fragment>
                  <li>
                    <p className='btn blue'>Credits: {user.credits}</p>
                  </li>

                  <li>
                    <Payments />
                  </li>

                  <li>
                    <a className='btn red lighten-1' href='/api/logout'>
                      Logout
                    </a>
                  </li>
                </React.Fragment>
              ) : (
                <li>
                  <a className='btn blue' href='/auth/google'>
                    Login With Google
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth,
  };
}

export default connect(mapStateToProps)(Header);
