import { CUSTOMER } from 'actions';

class Customer {

  static init(customerInfo) {
    return {
      type: CUSTOMER.INIT,
      customerInfo
    }
  }

  static checkIn(customer) {
    return {
      type: CUSTOMER.CHECKIN,
      customer
    }
  }

  static checkOut(customer) {
    return {
      type: CUSTOMER.CHECKOUT,
      customer
    }
  }
}

export default Customer;
