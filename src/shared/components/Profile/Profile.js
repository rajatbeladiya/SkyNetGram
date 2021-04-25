import React, { Component } from 'react';
import BlockUI from 'react-block-ui';
import { reduxForm, Form } from 'redux-form';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import NewAppLogo from '../../../assets/icons/skynet-logo.png';
import GoogleLoader from '../../../shared/components/GoogleLoader';
import CustomDropzone from '../../../shared/components/CustomDropzone';
import { noop } from '../../../utils';

const Profile = ({
  handleSubmit, selectedFile, onDropFiles,
  uploadImage, previewImage, isDropZoneHasError,
  loading, userId, isLoggedIn,
}) => (
  <div className="profile-container">
    <div className="profile-wrapper">
      <div className="profile-pic-container">
        <img src={NewAppLogo} alt="profilepic" className="profile-pic" />
      </div>
      <div className="username">{userId || 'user_id'}</div>
    </div>
    {
      isLoggedIn && (
        <BlockUI
          tag="div"
          blocking={loading}
          className="full-height"
          loader={<GoogleLoader height={50} width={50} />}
        >
          <div className="right-upload-content">
            <Form onSubmit={handleSubmit(uploadImage)}>
              <div className="right-content-title">
                <h5>Choose File to Upload Content</h5>
              </div>
              <div className="custom-dropzone-wrapper">
                <CustomDropzone
                  onDropFiles={onDropFiles}
                  name="csvFileUploader"
                  dropzoneMessage="Drag and drop image to upload"
                  accept="image/*"
                  selectFileButtonLabel="Select file"
                  showPreview
                  imageSrc={previewImage}
                />
              </div>
              {
                isDropZoneHasError &&
                <p className="error">Please Choose At Least One File</p>
              }
              <div className="upload-content-button">
                <Button
                  type="submit"
                  className="upload-button"
                  variant="contained"
                  color="primary"
                  disabled={!selectedFile || !isLoggedIn}
                >
                  Upload
                </Button>
              </div>
            </Form>
          </div>
        </BlockUI>
      )
    }
  </div> 
);

Profile.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  uploadImage: PropTypes.func,
  onDropFiles: PropTypes.func,
  isDropZoneHasError: PropTypes.bool,
  loading: PropTypes.bool,
  selectedFile: PropTypes.instanceOf(Array),
  userId: ''
};

Profile.defaultProps = {
  uploadImage: noop,
  onDropFiles: noop,
  isDropZoneHasError: false,
  loading: false,
  selectedFile: '',
  userId: ''
};

export default reduxForm({ form: 'uploadContent' })(Profile);