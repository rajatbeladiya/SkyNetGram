import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ContentRecordDAC } from '@skynetlabs/content-record-library';

import Profile from './Profile';
import { uploadFile, imageUploadFilepath, client, privateKey, dataKey, dataDomain } from '../../../utils';
import * as landingActions from '../../../modules/landing/redux/actions';

const contentRecord = new ContentRecordDAC();

class ProfileContainer extends Component {
  state = {
    selectedFile: '',
    isDropZoneHasError: false,
    previewImage: '',
    uploadContentLoading: false,
  };
  
  uploadImage = async () => {
    this.setState({ uploadContentLoading: true });
    const skyLinkData = await uploadFile(this.state.selectedFile);
    const res = await this.props.mySkyData.setJSON(imageUploadFilepath, skyLinkData);
    const tempFeedData = this.props.feedData ? [...this.props.feedData] : [];
    const feedJson = {
      imageData: skyLinkData,
      userId: this.props.userId,
      creationDate: new Date().toDateString()
    };
    tempFeedData.unshift(feedJson);
    await client.db.setJSON(privateKey, dataKey, tempFeedData);
    contentRecord.recordNewContent({
      skylink: res.skylink
    });
    this.props.setFeedData(tempFeedData);
    this.setState({ uploadContentLoading: false });
  }
  
  handleChange = (fieldName, files) => {
    if (files) {
      this.setState({
        selectedFile: files[0],
        isDropZoneHasError: false,
        previewImage: URL.createObjectURL(files[0]),
      });
    }
  }

  render() {
    return (
      <Profile
        onDropFiles={this.handleChange}
        uploadImage={this.uploadImage}
        selectedFile={this.state.selectedFile}
        previewImage={this.state.previewImage}
        isDropZoneHasError={this.state.isDropZoneHasError}
        userId={this.props.userId}
        isLoggedIn={this.props.isLoggedIn}
        loading={this.state.uploadContentLoading}
      />
    )
  }
}

const mapStateToProps = state => ({
  userId: state.landing.userId,
  mySkyData: state.landing.mySkyData,
  feedData: state.landing.feedData,
  isLoggedIn: state.landing.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  setFeedData: data => dispatch(landingActions.setFeedData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);