import React from 'react';
import Draggable from 'react-draggable';
import ToolBar from '../ToolBar';
import './index.css';
import ThirtySeven from '../../../common-utils/ThirtySeven.js';

class Furnish extends React.Component {

  constructor(props) {
    super(props);

    this.furnishOnClick = this.furnishOnClick.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
    this.furnishOnDelete = this.furnishOnDelete.bind(this);
  }

  furnishOnClick(furnishId) {
    console.log(furnishId + ' on click!'); //TODO
  }

  furnishOnDelete(furnishId) {
    const deleteApi = () => {
      ThirtySeven.ajax.delete('map/furnish/' + furnishId).then(result => {
        if(result._status) {
          this.props.furnishOnDeleted(furnishId);
        } else {
          this.props.tooltip('danger', result._msg, true);
        }
      });
    };

    this.props.furnishDeleteDialog(
      'Note', // title
      'Are you sure to delete?', // content
      true, // yesOrNo
      () => { // confirm 
        deleteApi();
        return true;
      },
      () => { // cancel 
        return false;
      }
    );
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
          { this.props.control ? <ToolBar furnish={furnish} onDelete={this.furnishOnDelete} /> : null }
          <div className="furnish d-flex justify-content-center align-items-center" onClick={() => this.furnishOnClick(furnish.furnishid)}>{furnish.name}</div>
        </div>
      </Draggable>
     );
  }
}

export default Furnish;