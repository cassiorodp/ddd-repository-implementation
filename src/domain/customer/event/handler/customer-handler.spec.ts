import Address from '../../value-object/address';
import EventDispatcher from '../../../@shared/event/event-dispatcher';
import CustomerCreatedEvent from '../customer-created.event';
import CustomerAddressChangedEvent from '../customer-address-changed.event';
import SendConsoleLog1Handler from './send-console-log-1.handler';
import SendConsoleLog2Handler from './send-console-log-2.handler';
import EnviaConsoleLogHandler from './send-console-log.handler';

describe('Customer domain events tests', () => {
  it('should register CustomerCreatedEvent handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();

    eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'],
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length,
    ).toBe(2);
  });

  it('should notify CustomerCreatedEvent handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();

    const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle');
    const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle');

    eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

    const customerCreatedEvent = new CustomerCreatedEvent('1', 'John Doe');

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it('should print console.log messages when CustomerCreatedEvent is dispatched', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

    const customerCreatedEvent = new CustomerCreatedEvent('1', 'John Doe');

    eventDispatcher.notify(customerCreatedEvent);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Esse é o primeiro console.log do evento: CustomerCreated',
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      'Esse é o segundo console.log do evento: CustomerCreated',
    );

    consoleSpy.mockRestore();
  });

  it('should register CustomerAddressChangedEvent handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();

    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'],
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'].length,
    ).toBe(1);
  });

  it('should notify CustomerAddressChangedEvent handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();

    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

    const address = new Address(
      'Rua das Flores',
      123,
      '12345-678',
      'São Paulo',
    );
    const customerAddressChangedEvent = new CustomerAddressChangedEvent(
      '1',
      'John Doe',
      address,
    );

    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it('should print console.log message when CustomerAddressChangedEvent is dispatched', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

    const address = new Address(
      'Rua das Flores',
      123,
      '12345-678',
      'São Paulo',
    );
    const customerAddressChangedEvent = new CustomerAddressChangedEvent(
      '1',
      'John Doe',
      address,
    );

    eventDispatcher.notify(customerAddressChangedEvent);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Endereço do cliente: 1, John Doe alterado para: Rua das Flores, 123, 12345-678 São Paulo',
    );

    consoleSpy.mockRestore();
  });

  it('should unregister CustomerCreatedEvent handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();

    eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length,
    ).toBe(2);

    eventDispatcher.unregister('CustomerCreatedEvent', eventHandler1);

    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length,
    ).toBe(1);
  });

  it('should unregister CustomerAddressChangedEvent handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();

    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'].length,
    ).toBe(1);

    eventDispatcher.unregister('CustomerAddressChangedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'].length,
    ).toBe(0);
  });

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();
    const eventHandler3 = new EnviaConsoleLogHandler();

    eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2);
    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler3);

    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length,
    ).toBe(2);
    expect(
      eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'].length,
    ).toBe(1);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'],
    ).toBeUndefined();
    expect(
      eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'],
    ).toBeUndefined();
  });
});
