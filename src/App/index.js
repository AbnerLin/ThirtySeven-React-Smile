import React from 'react';
import ThirtySeven from '../CommonUtils/ThirtySeven.js';
import { Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import './index.css';
import Map from '../Map';
import Tooltip from '../Tooltip';

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            maps: null,
            focusTabIndex: 0,
            tooltip: {
              tooltipMsg: null,
              tooltipFadeOut: true,
              tooltipType: 'info'
            }
        };
        this.navOnClick = this.navOnClick.bind(this);
        this.showTooltip = this.showTooltip.bind(this);
    }

    componentWillMount() {
        ThirtySeven.ajax.get('customer').then(res => {
            // this.setState({
            //     diningCustomer: res._data
            // });
            console.log(res._data);
        });
        ThirtySeven.ajax.get('map').then(res => {
            this.setState({
                maps: res._data
            });
        });
    }

    navOnClick(index, mapId) {
        this.setState({
            focusTabIndex: index
        });
    }

    getChildContext() {
      return {
        toolTip: this.showTooltip
      };
    }

    showTooltip(type, message, fadeOut) {
      this.setState({
        tooltip: {
          tooltipMsg: message,
          tooltipFadeOut: fadeOut,
          tooltipType: type
        }
      });
    }

    render() {
        return (
          <div>
            <div>
              <Tooltip type={this.state.tooltip.tooltipType} message={this.state.tooltip.tooltipMsg} fadeOut={this.state.tooltip.tooltipFadeOut} />
            </div>
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
          </div>
        );
    }
}

App.childContextTypes = {
  toolTip: PropTypes.func
};

export default App;