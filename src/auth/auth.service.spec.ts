import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { env } from 'process';

const mockUsersService = {
  findOneByEmail: jest.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('validateUser', () => {
    it('should return a user', async () => {
      const expected = {
        id: 1,
        username: 'test',
        email: 'email@example.com',
        password: env.HASEHDPASS_FOR_TEST,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (mockUsersService.findOneByEmail as jest.Mock).mockResolvedValue(
        expected,
      );
      const result = await authService.validateUser(
        'email@example.com',
        'password',
      );
      expect(result).toEqual(expected);
    });
    it('should return null', async () => {
      (mockUsersService.findOneByEmail as jest.Mock).mockResolvedValue(null);
      const result = await authService.validateUser(
        'email@example.com',
        'password',
      );
      expect(result).toBeNull();
    });
  });
});
