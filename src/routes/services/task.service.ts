import {CreateTask, Task, UpdateTask} from '../dto/task.dto';
import logger from '../../config/logger';
import TaskModel from '../../models/task.model';
import {PaginationRequestQuery} from '../../utills/api/pagination/pagination';

export async function onCreateDoc({task}: {task: CreateTask}): Promise<Task> {
  logger.debug(
    {
      task,
    },
    'Creating task',
  );
  const createdTask = await TaskModel.create(task);
  logger.info(
    {
      task,
      createdTask,
    },
    'Created task',
  );
  return createdTask;
}

export async function onGetDocs({
  paginationParams,
}: {
  paginationParams: PaginationRequestQuery;
}): Promise<Task[]> {
  logger.debug(
    {
      paginationParams,
    },
    'Getting tasks',
  );
  const tasks = await TaskModel.find({})
    .skip(paginationParams.skip)
    .limit(paginationParams.limit);
  logger.info(
    {
      paginationParams,
      tasks,
    },
    'Got tasks',
  );
  return tasks;
}

export async function onUpdateDocByIdOrThrow({
  updateTask,
  taskId,
}: {
  updateTask: UpdateTask;
  taskId: string;
}): Promise<Task> {
  logger.debug(
    {
      updateTask,
      taskId,
    },
    'Updating task by id ot throw',
  );
  const updatedTask = await TaskModel.findOneAndUpdate(
    {
      _id: taskId,
    },
    {
      $set: updateTask,
    },
    {
      new: true,
    },
  );
  if (updatedTask === null) {
    throw new Error('Task not updated');
  }
  logger.info(
    {
      taskId,
      updateTask,
      updatedTask,
    },
    'Updated task by id or throw',
  );
  return updatedTask;
}
