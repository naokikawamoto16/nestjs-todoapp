import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = {
  task: {
    create: jest.fn(),
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
      (prismaService.task.create as jest.Mock).mockResolvedValue({
        id: 1,
        name: 'Task 1',
        completed: false,
      });
      const expected = { id: 1, name: 'Task 1', completed: false };
      const result = await tasksService.create({ name: 'Task 1' });
      expect(result).toEqual(expected);
    });
  });
});
