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
            focusTabIndex: 0
        };
        this.navOnClick = this.navOnClick.bind(this);
    }

    componentWillMount() {
        // ThirtySeven.ajax.get('customer').then(res => {
        //     this.setState({
        //         diningCustomer: res._data
        //     });
        // });
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
        if(this.state.maps) {
            return (
              <div>
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
                </div>
                <div>
                  <Map map={this.state.maps[this.state.focusTabIndex]} />
                </div>
              </div>
            );
        }
        return null;
    }
}

export default App;