import React from 'react';
import ThirtySeven from '../../common-utils/ThirtySeven.js';
import { connect } from 'react-redux';

import { Nav, NavItem, NavLink } from 'reactstrap';
import Map from '../Map';

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

  componentWillReceiveProps(nextProps) {
    if(nextProps.isLogin) {
      // fecth map data from server.
      ThirtySeven.ajax.get('map').then(res => {
        this.setState({
            maps: res._data
        });
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
            <Map map={this.state.maps[this.state.focusTabIndex]} />
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);