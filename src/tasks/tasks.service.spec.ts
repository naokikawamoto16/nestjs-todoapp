import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = {
  task: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a task', async () => {
      const expected = {
        id: 1,
        name: 'Task 1',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (prismaService.task.create as jest.Mock).mockResolvedValue(expected);
      const result = await tasksService.create({ name: 'Task 1' });
      expect(result).toEqual(expected);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const expected = [
        {
          id: 1,
          name: 'Task 1',
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Task 2',
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      (prismaService.task.findMany as jest.Mock).mockResolvedValue(expected);
      const result = await tasksService.findAll();
      expect(result).toEqual(expected);
    });
  });

  describe('findOne', () => {
    it('should return a task', async () => {
      const expected = {
        id: 1,
        name: 'Task 1',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (prismaService.task.findUnique as jest.Mock).mockResolvedValue(expected);
      const result = await tasksService.findOne(1);
      expect(result).toEqual(expected);
    });
  });
});
