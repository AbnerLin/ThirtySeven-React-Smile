import React from 'react';

class Footer extends React.Component {

    render() {
        return (
            <div>
              <p>{this.props.copyright}</p>
            </div>
        );
    }
}

export default Footer;