import React from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import CustomerInfo from 'components/CustomerInfo';
import { connect } from 'react-redux';
import _ from 'lodash';

class OperationPanel extends React.Component {

  static PanelType = {
     CUSTOMER_INFO: { index: '1', title: 'Customer info' } ,
     BOOKING_PANEL: { index: '2', title: 'Booking panel' } ,
     BOOKING_HISTORY: { index: '3', title: 'Booking history' }
  };

  static TitleContext = '';
  static Title = () => <div>{OperationPanel.TitleContext}</div>;

  constructor(props) {
    super(props);

    this.navOnClick = this.navOnClick.bind(this);
    this.state = {
      activeTab: OperationPanel.PanelType.CUSTOMER_INFO.index
    };

  }

  componentWillMount() {
    OperationPanel.TitleContext = '';
    let customer = _.find(this.props.customerInfo, (o) => {
      return o.customerid === this.props.customerId;
    });

    if(!customer)
      return;

    OperationPanel.TitleContext = (() => {
      let infos = [customer.furnishObj.name, customer.name];
      return infos.join('_');
    })();
  }

  navOnClick(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    customerId: state.window.operationModal.currentCustomerId,
    customerInfo: state.customer.customerInfo,
  };
};

export default connect(
  mapStateToProps,
  null
)(OperationPanel);
