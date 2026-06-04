import Address from '../value-object/address';
import EventDispatcher from '../../@shared/event/event-dispatcher';
import Customer from '../entity/customer';
import CustomerCreatedEvent from '../event/customer-created.event';
import CustomerAddressChangedEvent from '../event/customer-address-changed.event';

export default class CustomerService {
  private eventDispatcher: EventDispatcher;

  constructor(eventDispatcher: EventDispatcher) {
    this.eventDispatcher = eventDispatcher;
  }

  createCustomer(id: string, name: string): Customer {
    const customer = new Customer(id, name);
    const customerCreatedEvent = new CustomerCreatedEvent(id, name);
    this.eventDispatcher.notify(customerCreatedEvent);
    return customer;
  }

  changeAddress(customer: Customer, address: Address): void {
    customer.changeAddress(address);
    const customerAddressChangedEvent = new CustomerAddressChangedEvent(
      customer.id,
      customer.name,
      address,
    );
    this.eventDispatcher.notify(customerAddressChangedEvent);
  }
}
