import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MapUtils } from 'common-utils';

import './index.css';

class Furnish extends React.Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string
  };

  static defaultProps = {
    name: ''
  };

  render() {
    var iconClassName = MapUtils.FurnishClass.getById(this.props.type);
    iconClassName = iconClassName ? iconClassName.name.toLowerCase() : '';

    return (
      <div className="box">
        {this.props.children}
        <div className={"furnish d-flex justify-content-center align-items-center " + iconClassName }>
          {this.props.name}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    furnishClass: state.map.furnishClass
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Furnish);
