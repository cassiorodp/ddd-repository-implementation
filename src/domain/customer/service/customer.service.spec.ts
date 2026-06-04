import Address from '../value-object/address';
import EventDispatcher from '../../@shared/event/event-dispatcher';
import CustomerService from './customer.service';
import SendConsoleLog1Handler from '../event/handler/send-console-log-1.handler';
import SendConsoleLog2Handler from '../event/handler/send-console-log-2.handler';
import SendConsoleLogHandler from '../event/handler/send-console-log.handler';

describe('Customer service with domain events', () => {
  it('should create a customer and dispatch CustomerCreatedEvent', () => {
    const eventDispatcher = new EventDispatcher();
    const customerService = new CustomerService(eventDispatcher);

    const eventHandler1 = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();

    const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle');
    const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle');

    eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

    const customer = customerService.createCustomer('1', 'John Doe');

    expect(customer.id).toBe('1');
    expect(customer.name).toBe('John Doe');
    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it('should change customer address and dispatch CustomerAddressChangedEvent', () => {
    const eventDispatcher = new EventDispatcher();
    const customerService = new CustomerService(eventDispatcher);

    const eventHandler = new SendConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

    const customer = customerService.createCustomer('1', 'John Doe');
    const address = new Address(
      'Rua das Flores',
      123,
      '12345-678',
      'São Paulo',
    );

    customerService.changeAddress(customer, address);

    expect(customer.Address.street).toBe('Rua das Flores');
    expect(customer.Address.number).toBe(123);
    expect(spyEventHandler).toHaveBeenCalled();
  });

  it('should dispatch CustomerCreatedEvent with console logs', () => {
    const eventDispatcher = new EventDispatcher();
    const customerService = new CustomerService(eventDispatcher);

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const eventHandler1 = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();

    eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

    customerService.createCustomer('1', 'John Doe');

    expect(consoleSpy).toHaveBeenCalledWith(
      'Esse é o primeiro console.log do evento: CustomerCreated',
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      'Esse é o segundo console.log do evento: CustomerCreated',
    );

    consoleSpy.mockRestore();
  });

  it('should dispatch CustomerAddressChangedEvent with console log', () => {
    const eventDispatcher = new EventDispatcher();
    const customerService = new CustomerService(eventDispatcher);

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const eventHandler = new SendConsoleLogHandler();

    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

    const customer = customerService.createCustomer('1', 'John Doe');
    const address = new Address(
      'Rua das Flores',
      123,
      '12345-678',
      'São Paulo',
    );

    customerService.changeAddress(customer, address);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Endereço do cliente: 1, John Doe alterado para: Rua das Flores, 123, 12345-678 São Paulo',
    );

    consoleSpy.mockRestore();
  });
});
