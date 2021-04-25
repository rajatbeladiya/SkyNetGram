import React from 'react';
import { withRouter } from 'react-router';

import NewAppLogo from '../../../assets/icons/skynet-logo.png';
import { Button } from '@material-ui/core';

const AppHeader = ({ isLoggedIn, handleLoginClick }) => {
  return (
    <div className="app-header-container" id="app-header">
      <header className="app-header">
        <div className="logo" id="app-logo">
          <img src={NewAppLogo} alt="fortress lending" />
        </div>
        <div className="login-action">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleLoginClick()}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </Button>
        </div>
      </header>
    </div>
  );
};

export default withRouter(AppHeader);
