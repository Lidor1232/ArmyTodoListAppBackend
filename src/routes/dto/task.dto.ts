export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export enum TaskStatus {
  Created = 'created',
  Completed = 'completed',
  Deleted = 'deleted',
}

export interface CreateTask {
  title: string;
  description: string;
}

export interface UpdateTask {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
