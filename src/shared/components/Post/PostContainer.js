import React, { Component } from 'react';

import Post from './Post';

class PostContainer extends Component {
  render() {
    return (
      <Post data={this.props.data} />
    );
  }
}

export default PostContainer;
