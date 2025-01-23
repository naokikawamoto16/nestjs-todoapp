import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { env } from 'process';
import { JwtService } from '@nestjs/jwt';

const mockUsersService = {
  findOneByEmail: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
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
      (usersService.findOneByEmail as jest.Mock).mockResolvedValue(expected);
      const result = await authService.validateUser(
        'email@example.com',
        'password',
      );
      expect(result).toEqual(expected);
    });
    it('should return null', async () => {
      (usersService.findOneByEmail as jest.Mock).mockResolvedValue(null);
      const result = await authService.validateUser(
        'email@example.com',
        'password',
      );
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const user = {
        id: 1,
        username: 'test',
        email: 'email@example.com',
        password: env.HASEHDPASS_FOR_TEST,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (jwtService.sign as jest.Mock).mockResolvedValue('token');
      const result = await authService.login(user);
      expect(result.accessToken).toBeDefined();
    });
  });
});
