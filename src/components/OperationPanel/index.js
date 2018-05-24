import React from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import CustomerInfo from 'components/CustomerInfo';

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
      activeTab: OperationPanel.PanelType.CUSTOMER_INFO.index
    };
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
            <CustomerInfo />
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

export default OperationPanel;
