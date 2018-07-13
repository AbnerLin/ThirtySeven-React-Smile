import React from 'react';
import { ThirtySeven } from 'common-utils';
import { connect } from 'react-redux';
import { Nav, NavItem, NavLink } from 'reactstrap';
import MapComponent from 'components/Map';
import OperationPanel from 'components/OperationPanel';
import { CustomerReduxCreator, MapReduxCreator, WindowReduxCreator } from 'actions/creators';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        maps: null,
        focusTabIndex: 0,
        operationPanelModal: false
    };

    this.navOnClick = this.navOnClick.bind(this);
    this.operationPanelModalToggle = this.operationPanelModalToggle.bind(this);
  }

  async componentWillReceiveProps(nextProps) {

    if(this.props.isLogin !== nextProps.isLogin) {
      /** fetch furnish class data from server. */
      await ThirtySeven.ajax.get('/map/furnishClass').then(res => {
        this.props.initFurnishClass(res._data);
      });

      /** fetch customer data from server. */
      await ThirtySeven.ajax.get('customer').then(res => {
        this.props.initCustomerInfo(res._data);
      });

      /** fecth map data from server. */
      await ThirtySeven.ajax.get('map').then(res => {
        this.setState({
            maps: res._data
        });
      });
    }
  }

  navOnClick(index, mapId) {
    this.setState({
        focusTabIndex: index
    });
  }

  operationPanelModalToggle() {
    this.setState({
      operationPanelModal: !this.state.operationPanelModal
    });
  }

  render() {
    return (
      <div>

        <OperationPanel />

        { this.state.maps ? (
          <div className="mt-3">
            <Nav tabs>
              {this.state.maps.map((_map, index) =>
                <NavItem key={_map.mapid}>
                  <NavLink
                    href="#"
                    active={index === this.state.focusTabIndex}
                    onClick={() => this.navOnClick(index, _map.mapid)}>
                        {_map.name}
                  </NavLink>
                </NavItem>
              )}
            </Nav>
            <MapComponent map={this.state.maps[this.state.focusTabIndex]} />
          </div>
        ) : (
          null
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.auth.isLogin,
    operationModal: state.window.operationModal.modalShow
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initCustomerInfo: customerInfo => {
      dispatch(CustomerReduxCreator.init(customerInfo));
    },
    initFurnishClass: furnishClass => {
      dispatch(MapReduxCreator.FurnishClass.initFurnishClass(furnishClass));
    },
    toggleOperationPanelModal: () => {
      dispatch(WindowReduxCreator.operationPanel.toggleModal())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
