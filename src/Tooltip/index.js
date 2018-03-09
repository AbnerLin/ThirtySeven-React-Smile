import React from 'react';
import { Alert } from 'reactstrap';
import './index.css';


class Tooltip extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }

    this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidUpdate(prevProps) {
  	if(this.props.message !== prevProps.message) {
  	  if(this.props.message) {
	      this.setState({
	      	visible: true
	      }, () => {
	      
	      if (this.props.fadeOut) {
	        setTimeout(() => {
	          this.onDismiss();
	        }, 5000);
	      }
	      });
	    }
  	}
  }

  onDismiss() {
    this.setState({
      visible: false
    });
  }

  render() {
  	return (
	  <Alert className="message" color={this.props.type} isOpen={this.state.visible} toggle={this.onDismiss}>
       	{ this.props.message }
      </Alert>
    );
  }
}

export default Tooltip;