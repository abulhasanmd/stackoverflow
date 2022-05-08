import React from 'react';
import {Navigate} from 'react-router-dom';
// import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import AuthForm from '../../components/auth-form/AuthForm';

const LoginPage = ({isAuthenticated}) => {
  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
      <div className='auth-page'>
        <div className='register-content'>
          <div className='register-grid'>
            <AuthForm action={'Log in'} />
          </div>
        </div>
      </div>
  );
};

LoginPage.propTypes = {
  isAuthenticated: PropTypes.bool,
};

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });

export default LoginPage;
