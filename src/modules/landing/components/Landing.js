import React, { Component } from 'react';

import PostContainer from '../../../shared/components/Post/PostContainer';
import ProfileContainer from '../../../shared/components/Profile/ProfileContainer';

class Landing extends Component {
  render() {
    return (
      <div className="landing-container">
        <div className="landing-left">
          {
            this.props.feedData && this.props.feedData.length > 0 ? this.props.feedData.map(data => (
              <PostContainer data={data} />
            )) : (
              <div className="no-data">No Posts</div>
            )
          }
        </div>
        <div className="landing-right">
          <ProfileContainer />
        </div>
      </div>
    );
  }
}

export default Landing;
