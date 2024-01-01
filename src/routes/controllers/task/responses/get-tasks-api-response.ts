import {TaskApiResponse} from './task-api-response';
import {Task} from '../../../dto/task.dto';

export class GetTasksApiResponse {
  tasks: TaskApiResponse[];

  constructor({tasks}: {tasks: Task[]}) {
    this.tasks = tasks.map(
      task =>
        new TaskApiResponse({
          task,
        }),
    );
  }
}
