import React from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Modal, ModalHeader, ModalBody } from 'reactstrap';
import CustomerInfo from 'components/CustomerInfo';
import { connect } from 'react-redux';
import _ from 'lodash';
import { WindowReduxCreator } from 'actions/creators';

class OperationPanel extends React.Component {

  static PanelType = {
     CUSTOMER_INFO: { index: '1', title: 'Customer info' } ,
     BOOKING_PANEL: { index: '2', title: 'Booking panel' } ,
     BOOKING_HISTORY: { index: '3', title: 'Booking history' }
  };

  constructor(props) {
    super(props);

    this.navOnClick = this.navOnClick.bind(this);
    this.state = {
      header: '',
      activeTab: OperationPanel.PanelType.CUSTOMER_INFO.index
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.customerId !== this.props.customerId) {
      let customer = _.find(this.props.customerInfo, (o) => {
        return o.customerid === nextProps.customerId;
      });

      if(!customer)
        return;

      this.setState({
        header: (() => {
          let infos = [customer.furnishObj.name, customer.name];
          return infos.join('_');
        })()
      });
    }
  }

  navOnClick(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    var Content = () =>
      <div>
        <Nav tabs>
          {
            Object.values(OperationPanel.PanelType).map((obj, index) =>
              <NavItem key={obj.index}>
                <NavLink
                  href="#"
                  active={obj.index === this.state.activeTab}
                  onClick={() => this.navOnClick(obj.index)}>
                  { obj.title }
                </NavLink>
              </NavItem>
            )
          }
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId={OperationPanel.PanelType.CUSTOMER_INFO.index}>
            <CustomerInfo customerId={this.props.customerId} />
          </TabPane>
          <TabPane tabId={OperationPanel.PanelType.BOOKING_PANEL.index}>
            booking panel
          </TabPane>
          <TabPane tabId={OperationPanel.PanelType.BOOKING_HISTORY.index}>
            booking history
          </TabPane>
        </TabContent>
      </div>;


    return (
      <Modal isOpen={this.props.operationModal} toggle={this.props.toggleOperationPanelModal} >
        <ModalHeader toggle={this.props.toggleOperationPanelModal}>
          { this.state.header }
        </ModalHeader>
        <ModalBody>
          <Content />
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    customerId: state.window.operationModal.currentCustomerId,
    customerInfo: state.customer.customerInfo,
    operationModal: state.window.operationModal.modalShow
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleOperationPanelModal: () => {
      dispatch(WindowReduxCreator.operationPanel.toggleModal())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OperationPanel);
