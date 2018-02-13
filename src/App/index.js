import React from 'react';
import ThirtySeven from '../CommonUtils/ThirtySeven.js';
import Map from '../Map';

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            diningCustomer: null
        };
    }

    componentWillMount() {
        ThirtySeven.ajax.get('customer').then(res => {
            this.setState({
                diningCustomer: res._data
            });
        });
    }

    render() {
        return (
            <Map> Index.. </Map>
        );
    }
}

export default App;