export class TasksFilterDto {
  readonly completed?: boolean;

  constructor(completed?: string) {
    this.completed =
      completed === 'true' ? true : completed === 'false' ? false : undefined;
  }
}
