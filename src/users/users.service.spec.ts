import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = {
  user: {
    create: jest.fn(),
  },
};

describe('UsersService', () => {
  let usersService: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('usersService should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('prismaService should be defined', () => {
    expect(prismaService).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const expected = {
        id: 1,
        username: 'test',
        email: 'email@example.com',
        password: 'abcdefg',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (prismaService.user.create as jest.Mock).mockResolvedValue(expected);
      const result = await usersService.create({
        username: 'test',
        email: 'email@example.com',
        password: 'password',
      });
      expect(result).toEqual(expected);
    });
  });
});
