import {Task} from '../../../dto/task.dto';

export class TaskApiResponse {
  _id: string;
  title: string;
  description: string;
  createdAt: string;

  constructor({task}: {task: Task}) {
    this._id = task._id;
    this.title = task.title;
    this.description = task.description;
    this.createdAt = task.createdAt;
  }
}
