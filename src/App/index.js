import React from 'react';
import ThirtySeven from '../CommonUtils/ThirtySeven.js';

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
            console.log(res._data);
        });
    }

    render() {
        return (
            <div> Index.. </div>
        );
    }
}

export default App;