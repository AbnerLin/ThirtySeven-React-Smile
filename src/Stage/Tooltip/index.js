import React from 'react';
import { Alert } from 'reactstrap';
import './index.css';


class Tooltip extends React.Component {

  constructor(props) {
    super(props);

    this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount() {
    if(this.props.message) {
      if (this.props.fadeOut) {
        setTimeout(() => {
          this.onDismiss();
        }, 3000);
      }
    }
  }

  onDismiss() {
    this.props.onDismiss();
  }

  render() {
  	return (
	    <Alert className="message" color={this.props.type} isOpen={true} toggle={this.onDismiss}>
       	{ this.props.message }
      </Alert>
    );
  }
}

export default Tooltip;