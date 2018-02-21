import React from 'react';
import ThirtySeven from '../CommonUtils/ThirtySeven.js';
import Furnish from './Furnish'
import './index.css';

class Map extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            style: null,
            mapInfo: null,
            control: true // TODO
        };
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

    render() {
        const FurnishList = () => {
            const itemList = this.state.mapInfo ? this.state.mapInfo.furnishList : null;
            var items = null;

            if (itemList) {
                items = itemList.map((item) => {
                    return <Furnish key={item.furnishid} control={this.state.control} furnish={item} />
                });
            }

            return items;
        };

        return (
          <div className="mapContainer">
            <div className="map" style={this.state.style}>
              <FurnishList />
            </div>
          </div>
        );
    }
}

export default Map;