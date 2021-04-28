import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from './Post';
import { client, contentRecord, likedataKey, likesFilepath, privateKey } from '../../../utils';
import * as landingActions from '../../../modules/landing/redux/actions';

class PostContainer extends Component {
  state = {
    likesLoading: false
  };

  onHeartClick = async (e, data) => {
    this.setState({ likesLoading: true });
    const res = await this.props.mySkyData.setJSON(likesFilepath, {});
    let tempLikesData = Object.keys(this.props.likesData).length > 0 ? {...this.props.likesData} : {};
    const likesJson = {
      [data && data.imageData && data.imageData.skylinkUrl]: {
        [this.props.userId]:
          (this.props.likesData[data && data.imageData && data.imageData.skylinkUrl]
            && this.props.likesData[data && data.imageData && data.imageData.skylinkUrl][this.props.userId]) === true
          ? false : true,
      }
    };
    if (likesJson[data && data.imageData && data.imageData.skylinkUrl][this.props.userId] === false) {
      delete tempLikesData[data && data.imageData && data.imageData.skylinkUrl][this.props.userId];
      delete likesJson[data && data.imageData && data.imageData.skylinkUrl][this.props.userId];
    }
    tempLikesData = {
      ...tempLikesData,
      [data && data.imageData && data.imageData.skylinkUrl]: {
        ...tempLikesData[data && data.imageData && data.imageData.skylinkUrl],
        ...likesJson[data && data.imageData && data.imageData.skylinkUrl]
      },
    };
    await client.db.setJSON(privateKey, likedataKey, tempLikesData);
    await contentRecord.recordNewContent({
      skylink: res.skylink
    });
    this.props.setLikesData(tempLikesData);
    this.setState({ likesLoading: false });
  }
  
  render() {
    return (
      <Post
        data={this.props.data}
        onHeartClick={this.onHeartClick}
        loading={this.state.likesLoading}
        likesData={this.props.likesData}
        userId={this.props.userId}
      />
    );
  }
}

const mapStateToProps = state => ({
  userId: state.landing.userId,
  mySkyData: state.landing.mySkyData,
  likesData: state.landing.likesData,
});

const mapDispatchToProps = dispatch => ({
  setLikesData: data => dispatch(landingActions.setLikesData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
