import React from 'react';
import * as Typicons from 'react-icons/lib/ti'
import * as FontAwesome from 'react-icons/lib/fa'
import './index.css';

class ToolBar extends React.Component {

    constructor(props) {
        super(props);

        this.furnishOnDelete = this.furnishOnDelete.bind(this);
    }

    furnishOnDelete(furnishId) {
        console.log(furnishId + ' on delete.');
    }

    render() {
        return(
            <div className="control">
              <div className="handle">
                <Typicons.TiAttachmentOutline />
              </div>
              <div onClick={ () => this.furnishOnDelete(this.props.furnish.furnishid) }>
                <FontAwesome.FaClose />
              </div>
            </div>
        );
    }
}

export default ToolBar;