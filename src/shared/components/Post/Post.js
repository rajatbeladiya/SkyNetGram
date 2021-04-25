import React from 'react';

import NewAppLogo from '../../../assets/icons/skynet-logo.png';
import heart from '../../../assets/icons/heart.svg';

const Post = ({ data = {} }) => (
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
        <img src={heart} alt="icon" className="icon" />
      </div>
    </div>
  </div>
)

export default Post;