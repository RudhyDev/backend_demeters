import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Setup de mocks
const mockPrismaConnect = jest.fn().mockResolvedValue(undefined);
const mockPrismaDisconnect = jest.fn().mockResolvedValue(undefined);

// Mock da classe PrismaClient que é estendida pelo PrismaService
jest.mock('@prisma/client', () => {
  const originalModule = jest.requireActual('@prisma/client');
  
  // Criando uma classe mock que simula o PrismaClient
  class MockPrismaClient {
    $connect = mockPrismaConnect;
    $disconnect = mockPrismaDisconnect;
  }

  return {
    ...originalModule,
    PrismaClient: MockPrismaClient,
  };
});

describe('PrismaService', () => {
  let service: PrismaService;
  let app: INestApplication;

  beforeEach(async () => {
    // Limpar todos os mocks entre os testes
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);

    // Criar app mock
    app = {
      close: jest.fn().mockResolvedValue(undefined),
    } as unknown as INestApplication;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should call $connect', async () => {
      await service.onModuleInit();
      expect(mockPrismaConnect).toHaveBeenCalled();
    });

    it('should handle connection errors', async () => {
      mockPrismaConnect.mockRejectedValueOnce(new Error('Connection error'));
      await expect(service.onModuleInit()).rejects.toThrow('Connection error');
    });
  });

  describe('onModuleDestroy', () => {
    it('should call $disconnect', async () => {
      await service.onModuleDestroy();
      expect(mockPrismaDisconnect).toHaveBeenCalled();
    });

    it('should handle disconnection errors', async () => {
      mockPrismaDisconnect.mockRejectedValueOnce(new Error('Disconnection error'));
      await expect(service.onModuleDestroy()).rejects.toThrow('Disconnection error');
    });
  });

  describe('enableShutdownHooks', () => {
    it('should register beforeExit event handler', () => {
      const processSpy = jest.spyOn(process, 'on');

      service.enableShutdownHooks(app);

      expect(processSpy).toHaveBeenCalledWith('beforeExit', expect.any(Function));
    });

    it('should call app.close when beforeExit is triggered', () => {
      const processSpy = jest.spyOn(process, 'on');
      service.enableShutdownHooks(app);

      // Pegar a função de callback registrada com process.on
      const callback = processSpy.mock.calls[0][1] as Function;

      // Chamar o callback
      callback();

      expect(app.close).toHaveBeenCalled();
    });
  });
});
