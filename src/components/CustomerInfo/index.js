import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

class CustomerInfo extends React.Component {

  static propTypes = {
    customerId: PropTypes.string.isRequired,
    customerInfo: PropTypes.array
  };

  componentWillMount() {
    this.customer = _.find(this.props.customerInfo, (o) => {
      return o.customerid === this.props.customerId;
    });
  }

  render() {
    return (
      <div>{this.props.customerId} {this.aaa}</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    customerInfo: state.customer.customerInfo
  };
};

export default connect(
  mapStateToProps,
  null
)(CustomerInfo);
