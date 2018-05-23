import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

class OperationPanel extends React.Component {

  static PanelType = [
    { CUSTOMER_INFO: { index: '1', title: 'Customer info' } },
    { BOOKING_PANEL: { index: '2', title: 'Booking panel' } },
    { BOOKING_HISTORY: { index: '3', title: 'Booking history' } }
  ];

  static TitleContext = null;
  static Title = () => <div>{OperationPanel.TitleContext}</div>;

  constructor(props) {
    super(props);

    this.navOnClick = this.navOnClick.bind(this);
    this.state = {
      activeTab: OperationPanel.PanelType.CUSTOMER_INFO
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
            OperationPanel.PanelType.values((type) =>
              <NavItem>
                <NavLink
                  href="#"
                  active={type.index === this.state.activeTab}
                  onClick={() => this.navOnClick(type.index)}>
                    {type.title}
                </NavLink>
              </NavItem>
            )
          }
        </Nav>
      </div>
    );
  }

}

export default OperationPanel;
