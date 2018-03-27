import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

class Header extends React.Component {

    render() {
        return (
            <div id="headerBlock">
              <div className="text-center">
                <img src="/images/logo.png" className="bigLogo" alt="logo" />
              </div>
              <header className="text-center">
                <div className="title">{this.props.title}</div>
              </header>
            </div>
        );
    }
}

export default Header;