import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

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
    let iconClassName = _.find(this.props.furnishClass, (o) => {
      return this.props.type === o.classid;
    });
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
