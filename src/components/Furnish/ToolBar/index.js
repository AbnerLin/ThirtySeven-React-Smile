import React from 'react';
import PropTypes from 'prop-types';
import * as Typicons from 'react-icons/lib/ti'
import * as FontAwesome from 'react-icons/lib/fa'
import './index.css';

class ToolBar extends React.Component {

  static propTypes = {
    furnishid: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(furnishId) {
    this.props.onDelete(furnishId);
  }

  render() {
    return(
      <div className="control">
        <div className="handle">
          <Typicons.TiAttachmentOutline />
        </div>
        <div onClick={ () => this.onDelete(this.props.furnishid) }>
          <FontAwesome.FaClose />
        </div>
      </div>
    );
  }
}

export default ToolBar;
