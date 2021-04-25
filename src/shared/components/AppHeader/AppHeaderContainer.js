import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppHeader from './AppHeader';
import * as landingActions from '../../../modules/landing/redux/actions';

class AppHeaderContainer extends Component {
  handleLoginClick = async () => {
    if (this.props.isLoggedIn) {
      await this.props.mySkyData.logout();
      this.props.setIsLoggedIn(false);
      this.props.setUserId('');
    } else {
      const loggedInStatus = await this.props.mySkyData.requestLoginAccess();
      this.props.setIsLoggedIn(loggedInStatus);
      if (loggedInStatus) {
        const userId = await this.props.mySkyData.userID()
        this.props.setUserId(userId);
      }
    }
  }
  
  render() {
    return (
      <AppHeader
        isLoggedIn={this.props.isLoggedIn}
        handleLoginClick={this.handleLoginClick}
      />
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.landing.isLoggedIn,
  mySkyData: state.landing.mySkyData
});

const mapDispatchToProps = dispatch => ({
  setUserId: userId => dispatch(landingActions.setUserId(userId)),
  setIsLoggedIn: isLoggedIn => dispatch(landingActions.setIsLoggedIn(isLoggedIn)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderContainer);
