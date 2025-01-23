import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = {
  task: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
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
        userId: 1,
        patientTaskId: null,
      };
      (prismaService.task.create as jest.Mock).mockResolvedValue(expected);
      const result = await tasksService.create(1, { name: 'Task 1' });
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
          userId: 1,
          patientTaskId: null,
        },
        {
          id: 2,
          name: 'Task 2',
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
          patientTaskId: null,
        },
      ];
      (prismaService.task.findMany as jest.Mock).mockResolvedValue(expected);
      const result = await tasksService.findAll(1);
      expect(result).toEqual(expected);
    });
    it('should return an array of tasks with filter', async () => {
      const expected = [
        {
          id: 1,
          name: 'Task 1',
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
          patientTaskId: null,
        },
      ];
      (prismaService.task.findMany as jest.Mock).mockResolvedValue(expected);
      const result = await tasksService.findAll(1, { completed: false });
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
        userId: 1,
        patientTaskId: null,
      };
      (prismaService.task.findUnique as jest.Mock).mockResolvedValue(expected);
      const result = await tasksService.findOne(1, 1);
      expect(result).toEqual(expected);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const expected = {
        id: 1,
        name: 'Task 1',
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        patientTaskId: null,
      };
      (prismaService.task.update as jest.Mock).mockResolvedValue(expected);
      const result = await tasksService.update(1, 1, { completed: true });
      expect(result).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should delete a task', async () => {
      const expected = {
        id: 1,
        name: 'Task 1',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        patientTaskId: null,
      };
      (prismaService.task.delete as jest.Mock).mockResolvedValue(expected);
      const result = await tasksService.remove(1, 1);
      expect(result).toEqual(expected);
    });
  });
});
