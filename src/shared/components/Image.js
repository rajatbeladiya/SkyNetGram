import React from 'react';
import PropTypes from 'prop-types';

const Image = ({
  src, alt, style, grayscale,
}) => (
  <div className={`image-container ${grayscale ? 'grayscale' : ''}`} >
    <img src={src} alt={alt} className="img" style={style} />
  </div>
);

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  grayscale: PropTypes.bool,
};

Image.defaultProps = {
  src: '',
  alt: '',
  style: {},
  grayscale: false,
};

export default Image;
