import React from 'react';
import ThirtySeven from '../CommonUtils/ThirtySeven.js';
import Draggable from 'react-draggable'

import './index.css';

class Map extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            style: null,
            mapInfo: null
        };

        this.furnishOnClick = this.furnishOnClick.bind(this);
    }

    getMapInfo() {
        ThirtySeven.ajax.get('map/' + this.props.map.mapid).then(res => {
            var _style = {
                width: res._data.width,
                height: res._data.height
            };
            this.setState({
                style: _style,
                mapInfo: res._data
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

    furnishOnClick() {
        console.log('!');
    }

    render() {
        var furnishList = null;

        if(this.state.mapInfo) {
            furnishList = this.state.mapInfo.furnishList.map((furnish) => {
                return (
                    <Draggable key={furnish.furnishid}
                        bounds="parent"
                        axis="both"
                        handle=".handle"
                        defaultPosition={{x: furnish.x, y: furnish.y}}>
                        <div className="box">
                          <div className="handle dragBtn">??</div>
                          <div onClick={this.furnishOnClick}>IIII</div>
                        </div>
                    </Draggable>
                );
            });

        }

        return (
          <div className="mapContainer">
            <div className="map" style={this.state.style}>
              {furnishList}
            </div>
          </div>
        );
    }
}

export default Map;