import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;
  let service: jest.Mocked<AppService>;

  beforeEach(() => {
    service = { getHello: jest.fn() } as any;
    controller = new AppController(service);
  });

  it('should return greeting from service', () => {
    service.getHello.mockReturnValue('Hello World!');
    expect(controller.getHello()).toBe('Hello World!');
    expect(service.getHello).toHaveBeenCalled();
  });
});
