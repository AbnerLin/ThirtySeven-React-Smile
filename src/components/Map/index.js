import React from 'react';
import { ThirtySeven, MapUtils } from 'common-utils';
import { connect } from 'react-redux';
import alertify from 'alertify.js';
import Furnish from './Furnish';
import _ from 'lodash';
import { withDraggable } from './Furnish/hoc';

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
    this.furnishOnDelete = this.furnishOnDelete.bind(this);
    this.furnishOnDragStop = this.furnishOnDragStop.bind(this);
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

  furnishOnDelete(furnishId) {
    alertify
      .okBtn('Yes')
      .cancelBtn('No')
      .confirm('Are you sure to delete?', () => {
        deleteApi();
      }, () => {
        // pass
      });

    const deleteApi = () => {
      ThirtySeven.ajax.delete('map/furnish/' + furnishId).then(result => {
        if(result._status) {
          alertify.logPosition('bottom right').success('delete success.');
          updateState();
        } else {
          alertify.logPosition('bottom right').error(result._msg);
        }
      });
    };

    const updateState = () => {
      /** update state. */
      this.setState((prevState, props) => {
        _.remove(prevState.mapInfo.furnishList, (furnish) => {
          return furnish.furnishid === furnishId;
        });
        return ({
          mapInfo: prevState.mapInfo
        });
      });
    };
  }

  furnishOnDragStop(event, draggableData, furnishId) {

    var furnish = _.find(this.state.mapInfo.furnishList, (o) => {
      return o.furnishid === furnishId;
    });

    furnish.x = draggableData.x;
    furnish.y = draggableData.y;

    ThirtySeven.ajax.put('map/furnish/' + furnish.furnishid, {
      furnish: furnish
    });
  }

  render() {
    const FurnishList = () => {
      const itemList = this.state.mapInfo ? this.state.mapInfo.furnishList : null;
      var items = null;

      if (itemList) {
        items = itemList.map((item) => {

          /** check if furnish is table, and if in use. */
          var inUse = _.find(this.props.customerInfo, (o) => {
            return o.furnish === item.furnishid;
          });

          var furnishClass = null;
          if(inUse) {
            furnishClass = inUse.furnishObj.furnishclass;
          } else {
            /** find table class uuid */
            var tableClass = MapUtils.FurnishClass.getByName('TABLE').classid;

            /** find empty table class uuid */
            var emptyTableClass = MapUtils.FurnishClass.getByName('EMPTY_TABLE').classid;

            furnishClass = emptyTableClass;
            if(item.furnishclass !== tableClass) {
              furnishClass = item.furnishclass;
            }
          }

          /** hoc */
          const Draggable = withDraggable(Furnish, item.name, furnishClass);

          return (
            <Draggable
                key={item.furnishid}
                id={item.furnishid}
                x={item.x}
                y={item.y}
                control={this.state.control}
                onDragStop={this.furnishOnDragStop}
                onDelete={this.furnishOnDelete}
            />
          );
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

const mapStateToProps = state => {
  return {
    customerInfo: state.customer.customerInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
