import { CUSTOMER } from '../index';

class Customer {

  init(customerInfo) {
    return {
      type: CUSTOMER.INIT,
      customerInfo
    }
  }

  checkIn(customer) {
    return {
      type: CUSTOMER.CHECKIN,
      customer
    }
  }

  checkOut(customer) {
    return {
      type: CUSTOMER.CHECKOUT,
      customer
    }
  }
}

export default Customer;
