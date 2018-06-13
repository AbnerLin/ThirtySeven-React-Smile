import React from 'react';
import PropTypes from 'prop-types';

class CheckIn extends React.Component {

  static propTypes = {
    furnishId: PropTypes.string.isRequired
  };

  render() {
    return <div>{this.props.furnishId} check in page.</div>;
  }
}

export default CheckIn;
