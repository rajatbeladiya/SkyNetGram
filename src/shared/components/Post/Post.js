import React from 'react';
import PropTypes from 'prop-types';
import BlockUI from 'react-block-ui';

import NewAppLogo from '../../../assets/icons/skynet-logo.png';
import heart from '../../../assets/icons/heart.svg';
import filledHeart from '../../../assets/icons/filled-heart.svg';
import { noop } from '../../../utils';
import GoogleLoader from '../GoogleLoader';

const Post = ({ data = {}, onHeartClick, loading, likesData = {}, userId }) => (
  <BlockUI
    tag="div"
    blocking={loading}
    className="post-block-ui"
    loader={<GoogleLoader height={50} width={50} />}
  >
    <div className="post-container">
      <div className="post-header">
        <div className="profile-pic-container">
          <img src={NewAppLogo} alt="profilepic" className="profile-pic" />
        </div>
        <div className="username">{data && data.userId}</div>
      </div>
      <div className="post-image">
        <div className="post-pic-container">
          <img src={data && data.imageData && data.imageData.skylinkUrl} alt="postpic" className="post-pic" />
        </div>
      </div>
      <div className="post-footer">
        <div className="icons-container">
          <img src={
            likesData[data && data.imageData && data.imageData.skylinkUrl] &&
            likesData[data && data.imageData && data.imageData.skylinkUrl][userId]
            ? filledHeart : heart} alt="icon" className="icon" onClick={(e) => onHeartClick(e, data)} />
          <div className="likes-count">
            {likesData && likesData[data && data.imageData && data.imageData.skylinkUrl]
              && Object.keys(likesData[data && data.imageData && data.imageData.skylinkUrl]).length > 0 ?
              likesData && likesData[data && data.imageData && data.imageData.skylinkUrl]
              && Object.keys(likesData[data && data.imageData && data.imageData.skylinkUrl]).length : 0 } likes
          </div>
        </div>
      </div>
    </div>
  </BlockUI>
);

Post.propTypes = {
  onHeartClick: PropTypes.func,
  loading: PropTypes.bool
};

Post.defaultProps = {
  onHeartClick: noop,
  loading: false
};

export default Post;