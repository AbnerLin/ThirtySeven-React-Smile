import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

class Header extends React.Component {

    render() {
        return (
            <header className="text-center p-2">
              <h1>{this.props.title}</h1>
            </header>
        );
    }
}

export default Header;