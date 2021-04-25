import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BlockUI from 'react-block-ui';
import Dropzone from 'react-dropzone';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Done';
import CrossIcon from '@material-ui/icons/Close';
import UploadIcon from '@material-ui/icons/CloudUpload';

import GoogleLoader from './GoogleLoader';
import Image from './Image';
import RequestStates from '../../utils/request-states';
import { noop } from '../../utils';

const CustomDropzone = ({
  requestState, feedbackId, onDropFiles, imageSrc, name, dropzoneMessage,
  multiple, showPreview, accept, hideUploadButton, selectFileButtonLabel, disabled,
}) => (
  <BlockUI
    tag="div"
    blocking={
      (requestState === RequestStates.loading
      || requestState === RequestStates.success
      || requestState === RequestStates.error)
      && feedbackId === name
    }
    loader={
      (requestState === RequestStates.loading && <GoogleLoader width={50} height={50} />)
      || (requestState === RequestStates.success
          && <CheckIcon className="feedback valid" width={50} height={50} />)
      || (requestState === RequestStates.error
          && <CrossIcon className="feedback invalid" width={50} height={50} />)
    }
  >
    <div className={`custom-dropzone ${multiple ? 'custom-dropzone-multiple' : ''}`} disabled={disabled}>
      <Dropzone
        multiple={multiple}
        accept={accept}
        onDrop={files => onDropFiles(name, files)}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="dropzone-content"
          >
            <input {...getInputProps()} className="dropzone-input" />
            <div className="dropzone-indication-area">
              <UploadIcon className="dropzone-upload-icon" />
              <p className="dropzone-upload-text">{dropzoneMessage}</p>
              {
                !hideUploadButton
                && (
                  <Fragment>
                    <p className="dropzone-upload-text or">or</p>
                    <Button
                      variant="contained"
                      color="primary"
                    >
                      {selectFileButtonLabel}
                    </Button>
                  </Fragment>
                )
              }
            </div>
            {
              showPreview && imageSrc && (
                <div className="dropzone-preview-container">
                  <div className="preview-content" key={imageSrc}>
                    <Image src={imageSrc} alt="Dropzone Preview" />
                  </div>
                </div>
              )
            }
          </div>
        )}
      </Dropzone>
    </div>
  </BlockUI>
);

CustomDropzone.propTypes = {
  requestState: PropTypes.string,
  feedbackId: PropTypes.string,
  onDropFiles: PropTypes.func,
  imageSrc: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  dropzoneMessage: PropTypes.string,
  multiple: PropTypes.bool,
  showPreview: PropTypes.bool,
  accept: PropTypes.string,
  hideUploadButton: PropTypes.bool,
  selectFileButtonLabel: PropTypes.string,
  disabled: PropTypes.bool,
};

CustomDropzone.defaultProps = {
  requestState: RequestStates.init,
  feedbackId: '',
  onDropFiles: noop,
  imageSrc: [],
  name: '',
  dropzoneMessage: 'Upload files',
  multiple: false,
  showPreview: false,
  accept: '',
  hideUploadButton: false,
  selectFileButtonLabel: 'Select files to upload',
  disabled: false,
};

export default CustomDropzone;
