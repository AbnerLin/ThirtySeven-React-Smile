import React from 'react';
import ThirtySeven from '../../common-utils/ThirtySeven.js';
import Furnish from './Furnish';
import _ from 'lodash';
import './index.css';

class Map extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      style: null,
      mapInfo: null,
      control: false
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.furnishOnDeleted = this.furnishOnDeleted.bind(this);
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

  onKeyDown(event) {
    if (event.keyCode === 18 || event.keyCode === 17) {
      this.setState({
        control: !this.state.control
      });
    }
  }

  furnishOnDeleted(furnishId) {
    this.setState((prevState, props) => {
      _.remove(prevState.mapInfo.furnishList, (furnish) => {
        return furnish.furnishid === furnishId;
      });

      return ({
        mapInfo: prevState.mapInfo
      });
    });
  }

  componentDidMount() {
    this.getMapInfo();
    document.addEventListener('keydown', this.onKeyDown);
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
          return <Furnish key={ item.furnishid }
                          control={ this.state.control }
                          furnish={ item }
                          furnishOnDeleted={ this.furnishOnDeleted }
          />
        });
      }

      return items;
    };

    return (
      <div>
        <div className="mapContainer">
          <div className="map" style={this.state.style}>
            <FurnishList />
          </div>
        </div>
      </div>
    );
  }
}

export default Map;
