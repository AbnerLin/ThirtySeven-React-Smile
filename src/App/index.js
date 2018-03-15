import React from 'react';
import ThirtySeven from '../CommonUtils/ThirtySeven.js';
import { Nav, NavItem, NavLink } from 'reactstrap';
import './index.css';
import Map from '../Map';

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

  render() {
    return (
      <div>
        <div id="stage"></div>
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

export default App;