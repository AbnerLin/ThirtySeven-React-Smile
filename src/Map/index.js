import React from 'react';
import ThirtySeven from '../CommonUtils/ThirtySeven.js';
import Furnish from './Furnish';
import Stage from '../Stage';
import Tooltip from '../Stage/Tooltip';
import Dialog from '../Stage/Dialog';

import _ from 'lodash';
import './index.css';

class Map extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      style: null,
      mapInfo: null,
      control: false,
      tooltip: {
        show: false,
      },
      dialog: {
        show: false,
        title: '',
        content: '',
        yesOrNo: false,
        operation: {
          confirm: null,
          cancel: null
        }
      }
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.dialogShowUp = this.dialogShowUp.bind(this);
    this.furnishOnDeleted = this.furnishOnDeleted.bind(this);
    this.onDismissTooltip = this.onDismissTooltip.bind(this);
    this.tooltipShowUp = this.tooltipShowUp.bind(this);
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

  tooltipShowUp(type, msg, fadeOut) {
    this.setState({
      tooltip: {
        show: true,
        type: type,
        msg: msg,
        fadeOut: fadeOut
      }
    });
  }

  dialogShowUp(title, content, yesOrNo, confirm, cancel) {
    this.setState({
      dialog: {
        show: true,
        title: title, 
        content: content,
        yesOrNo: yesOrNo,
        operation: {
          confirm: confirm,
          cancel: cancel
        },
        toggle: () => {
          this.setState({
            dialog: {
              show: false
            }
          });
        }
      }
    });
  }

  furnishOnDeleted(furnishId) {
    this.setState((prevState, props) => {
      _.remove(prevState.mapInfo.furnishList, (furnish) => {
        return furnish.furnishid === furnishId;
      });

      return ({ 
        mapInfo: prevState.mapInfo,
        tooltip: {
          show: true,
          type: 'success',
          msg: 'furnish ' + furnishId + ' deleted!',
          fadeOut: true
        }
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

  onDismissTooltip() {
    this.setState({
      tooltip: {
        show: false
      }
    });
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
                          furnishDeleteDialog={ this.dialogShowUp   }
                          furnishOnDeleted={ this.furnishOnDeleted }
                          tooltip={this.tooltipShowUp}
          />
        });
      }

      return items;
    };

    const tooltip = this.state.tooltip.show ? (
      <Stage>
        <Tooltip  type={this.state.tooltip.type} 
                  message={this.state.tooltip.msg} 
                  fadeOut={this.state.tooltip.fadeOut} 
                  onDismiss={this.onDismissTooltip} />
      </Stage>
    ) : null;

    const dialog = this.state.dialog.show ? (
      <Stage>
        <Dialog title={this.state.dialog.title} 
                content={this.state.dialog.content}
                confirm={this.state.dialog.operation.confirm}
                cancel={this.state.dialog.operation.cancel}
                yesOrNo={this.state.dialog.yesOrNo} 
                toggle={this.state.dialog.toggle} />
      </Stage>
    ) : null;

    return (
      <div>
        {tooltip}
        {dialog}
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