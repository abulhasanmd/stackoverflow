import React from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

// import {setAlert} from '../../redux/alert/alert.actions';

import Caption from './Caption/Caption';
import AuthForm from '../../components/auth-form/AuthForm';

import './Register.styles.scss';

const Register = ({isAuthenticated}) => {
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
      <div className='auth-page'>
        <div className='register-content'>
          <div className='register-grid'>
            <Caption />
            <AuthForm action={'Sign up'} />
          </div>
        </div>
      </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};


export default Register;
