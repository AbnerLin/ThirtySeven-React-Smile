import React from 'react';
import Draggable from 'react-draggable';
import ToolBar from '../ToolBar';
import './index.css';

class Furnish extends React.Component {

    constructor(props) {
        super(props);

        this.furnishOnClick = this.furnishOnClick.bind(this);
        this.onDragStop = this.onDragStop.bind(this);
    }

    furnishOnClick(furnishId) {
        console.log(furnishId + ' on click!'); //TODO
    }

    onDragStop(event, draggableData) {
        console.log('!!???');
        console.log(draggableData);
        console.log(event.target); //TODO
    }

    render() {
       const furnish = this.props.furnish;
       return (
            <Draggable
                bounds="parent"
                axis="both"
                handle=".handle"
                onStop={this.onDragStop}
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