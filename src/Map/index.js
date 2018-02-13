import React from 'react';
import ThirtySeven from '../CommonUtils/ThirtySeven.js';
import {DraggableCore} from 'react-draggable';

import './index.css';

class Map extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            map: null,
            style: null
        };
    }

    componentWillMount() {
        ThirtySeven.ajax.get('map').then(res => {
            var _style = {
                width: res._data[0].width,
                height: res._data[0].height
            };
            this.setState({
                map: res._data[0],
                style: _style
            });
        });
    }

    render() {
        return (
          <div className="map" style={this.state.style}>
            map
          </div>
        );
    }

}

export default Map;