import React from 'react';
import ReactDOM from 'react-dom';


class Stage extends React.Component {

  constructor(props) {
    super(props);

    this.stageRoot = document.getElementById('stage');
    this.container = document.createElement('div');
  }

  componentDidMount() {
    this.stageRoot.appendChild(this.container);
  }

  componentWillUnmount() {
    this.stageRoot.removeChild(this.container);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.container);
  }

}

export default Stage;