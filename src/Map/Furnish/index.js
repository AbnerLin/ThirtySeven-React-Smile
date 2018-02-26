import React from 'react';
import Draggable from 'react-draggable';
import ToolBar from '../ToolBar';
import './index.css';
import ThirtySeven from '../../CommonUtils/ThirtySeven.js';

class Furnish extends React.Component {

  constructor(props) {
    super(props);
    this.furnishOnClick = this.furnishOnClick.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
  }

  furnishOnClick(furnishId) {
    console.log(furnishId + ' on click!'); //TODO
  }

  onDragStop(event, draggableData, furnish) {
    furnish.name = furnish.name;
    furnish.x = draggableData.x;
    furnish.y = draggableData.y;
    ThirtySeven.ajax.put('map/furnish/' + furnish.furnishid, {
      furnish: furnish
    });
  }

  render() {
    const furnish = this.props.furnish;
    return (
      <Draggable
        bounds="parent"
        axis="both"
        handle=".handle"
        onStop={ (event, draggableData) => {
          this.onDragStop(event, draggableData, furnish);
        }}
        id={furnish.furnishid}
        defaultPosition={{x: furnish.x, y: furnish.y}}>
        <div className="box">
          { this.props.control ? <ToolBar furnish={furnish} /> : null }
          <div className="furnish d-flex justify-content-center align-items-center" onClick={() => this.furnishOnClick(furnish.furnishid)}>{furnish.name}</div>
        </div>
      </Draggable>
     );
  }
}

export default Furnish;