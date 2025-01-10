import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly parentTaskId?: number;
}
