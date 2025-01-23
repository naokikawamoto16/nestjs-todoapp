import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  readonly name: string;
  readonly dueDate?: Date;
  readonly parentTaskId?: number;
}
