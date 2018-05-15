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

  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props.furnishClass);
    // console.log(this.props.type);
    // console.log(this.props.name);
    // console.log(this.props.name);
    // console.log('----');

    // let iconClassName = _.find(this.props.furnishClass, (o) => {
    //   return this.props.type === o.classid;
    // }).name.toLowerCase();
    let iconClassName = 'table';

    return (
      <div className="box">
        {this.props.children}
        <div className={"furnish d-flex justify-content-center align-items-center " + iconClassName }>{this.props.name}</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state.map);
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
