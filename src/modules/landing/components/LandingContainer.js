import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Landing from './Landing';
import * as landingActions from '../redux/actions';
import {
  dataDomain, dataKey,
  client as skynetClient, publicKey, contentRecord, likedataKey
} from '../../../utils';

class LandingContainer extends Component {

  componentDidMount() {
    const initMySky = async () => {
      this.props.setLoading(true);
      const mySky = await skynetClient.loadMySky(dataDomain);
      this.props.getMySkyData(mySky);
      await mySky.loadDacs(contentRecord);
      const loggedIn = await mySky.checkLogin();
      this.props.setIsLoggedIn(loggedIn);
      if (loggedIn) {
        const userId = await mySky.userID(); 
        this.props.setUserId(userId);
      }
    }
    initMySky().then(async () => {
      const res = await skynetClient.db.getJSON(publicKey, dataKey);
      const likeRes = await skynetClient.db.getJSON(publicKey, likedataKey);
      this.props.setFeedData(res && res.data);
      this.props.setLikesData((likeRes && likeRes.data) || {});
      this.props.setLoading(false);
    });
  }

  render() {
    return (
      <Landing feedData={this.props.feedData} />
    );
  }
}

LandingContainer.propTypes = {
  mySkyData: PropTypes.instanceOf(Object),
  feedData: PropTypes.instanceOf(Array),
};

LandingContainer.defaultProps = {
  mySkyData: {},
  feedData: []
};

const mapStateToProps = state => ({
  mySkyData: state.landing.mySkyData,
  feedData: state.landing.feedData,
});

const mapDispatchToProps = dispatch => ({
  getMySkyData: data => dispatch(landingActions.getMySkyData(data)),
  setUserId: userId => dispatch(landingActions.setUserId(userId)),
  setIsLoggedIn: isLoggedIn => dispatch(landingActions.setIsLoggedIn(isLoggedIn)),
  setFeedData: data => dispatch(landingActions.setFeedData(data)),
  setLikesData: data => dispatch(landingActions.setLikesData(data)),
  setLoading: data => dispatch(landingActions.setLoading(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);
