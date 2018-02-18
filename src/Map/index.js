import React from 'react';
import ThirtySeven from '../CommonUtils/ThirtySeven.js';
import Draggable from 'react-draggable';
import * as Typicons from 'react-icons/lib/ti'
import * as FontAwesome from 'react-icons/lib/fa'
import './index.css';

class Map extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            style: null,
            mapInfo: null,
            control: true // TODO
        };

        this.furnishOnClick = this.furnishOnClick.bind(this);
        this.furnishOnDelete = this.furnishOnDelete.bind(this);
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
        console.log('!'); // TODO
    }

    furnishOnDelete(furnishId) {
        // TODO
        console.log(furnishId + ' on delete.');
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
                          {
                            this.state.control ?
                            (<div className="control">
                              <div className="handle">
                                <Typicons.TiAttachmentOutline />
                              </div>
                              <div onClick={ () => this.furnishOnDelete(furnish.furnishid) }>
                                <FontAwesome.FaClose />
                              </div>
                            </div>) : null
                          }
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