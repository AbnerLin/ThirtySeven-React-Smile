import React from 'react';
import ThirtySeven from '../../common-utils/ThirtySeven.js';
import { connect } from 'react-redux';
import { Nav, NavItem, NavLink } from 'reactstrap';
import MapComponent from '../Map';
import { Customer, Map } from '../../actions/creators';

import './index.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        maps: null,
        focusTabIndex: 0
    };
    this.navOnClick = this.navOnClick.bind(this);
  }

  async componentWillReceiveProps(nextProps) {
    if(nextProps.isLogin) {

      /** fetch furnish class data from server. */
      await ThirtySeven.ajax.get('/map/furnishClass').then(res => {
        this.props.initFurnishClass(res._data);
      });

      /** fecth map data from server. */
      await ThirtySeven.ajax.get('map').then(res => {
        this.setState({
            maps: res._data
        });
      });

      /** fetch customer data from server. */
      await ThirtySeven.ajax.get('customer').then(res => {
        this.props.initCustomerInfo(res._data);
      });

    }
  }

  navOnClick(index, mapId) {
    this.setState({
        focusTabIndex: index
    });
  }

  render() {
    return (
      <div>
        { this.state.maps ? (
          <div className="mt-3">
            <Nav tabs>
              {this.state.maps.map((_map, index) =>
                <NavItem key={_map.mapid}>
                  <NavLink
                    href="#"
                    active={index === this.state.focusTabIndex}
                    onClick={() => this.navOnClick(index, _map.mapid)}>
                        {_map.name}
                  </NavLink>
                </NavItem>
              )}
            </Nav>
            <MapComponent map={this.state.maps[this.state.focusTabIndex]} />
          </div>
        ) : (
          null
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.auth.isLogin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initCustomerInfo: customerInfo => {
      dispatch(Customer.init(customerInfo));
    },
    initFurnishClass: furnishClass => {
      dispatch(Map.initFurnishClass(furnishClass));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
