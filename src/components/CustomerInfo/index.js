import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CustomerInfo extends React.Component {

  static propTypes = {
    customerId: PropTypes.string.isRequired
  };

  render() {
    return (
      <div>aaaa</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    customerInfo: state.customer.customerInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerInfo);
