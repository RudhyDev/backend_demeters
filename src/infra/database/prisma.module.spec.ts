import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from './prisma.module';
import { PrismaService } from './prisma.service';
import { Module } from '@nestjs/common';

// Setup de mocks para PrismaClient
jest.mock('@prisma/client', () => {
  class MockPrismaClient {
    $connect = jest.fn().mockResolvedValue(undefined);
    $disconnect = jest.fn().mockResolvedValue(undefined);
  }

  return {
    PrismaClient: MockPrismaClient,
  };
});

describe('PrismaModule', () => {
  let module: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [PrismaModule],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should provide PrismaService', () => {
    expect(prismaService).toBeDefined();

    expect(prismaService).toBeInstanceOf(PrismaService);
  });

  it('should be a global module', () => {
    const moduleProviders = Reflect.getMetadata('providers', PrismaModule);
    expect(moduleProviders).toBeDefined();
    expect(moduleProviders).toContain(PrismaService);

    const moduleExports = Reflect.getMetadata('exports', PrismaModule);
    expect(moduleExports).toBeDefined();
    expect(moduleExports).toContain(PrismaService);

    expect(prismaService).toBeDefined();
  });

  it('should export PrismaService', () => {
    expect(prismaService).toBeDefined();

    const anotherRefToService = module.get<PrismaService>(PrismaService);
    expect(anotherRefToService).toBe(prismaService);
  });
});
