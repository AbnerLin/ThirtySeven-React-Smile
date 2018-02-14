import React from 'react';
import ThirtySeven from '../CommonUtils/ThirtySeven.js';
import {DraggableCore} from 'react-draggable';

import './index.css';

class Map extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            style: null
        };
    }

    getMapInfo() {
        ThirtySeven.ajax.get('map/' + this.props.map.mapid).then(res => {
            var _style = {
                width: res._data.width,
                height: res._data.height
            };
            this.setState({
                style: _style
            });
        });
    }

    componentDidMount() {
        this.getMapInfo();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.map !== this.props.map) {
            this.getMapInfo();
        }
    }

    render() {
        return (
          <div className="mapContainer">
            <div className="map" style={this.state.style}>
              {this.props.map.name}
            </div>
          </div>
        );
    }

}

export default Map;