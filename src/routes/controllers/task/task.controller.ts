import {NextFunction, Request, Response} from 'express';
import {onGetPaginationParams} from '../../../utills/api/pagination/pagination';
import * as TaskService from '../../services/task.service';
import {GetTasksApiResponse} from './responses/get-tasks-api-response';
import {CreateTask, GetTasks, TaskStatus, UpdateTask} from '../../dto/task.dto';
import {TaskApiResponse} from './responses/task-api-response';

export async function getTasks(
  req: Request<
    unknown,
    unknown,
    GetTasks,
    {
      page?: number;
      limit?: number;
    }
  >,
  res: Response,
  next: NextFunction,
) {
  try {
    const paginationParams = onGetPaginationParams({
      page: req.query.page,
      limit: req.query.limit,
    });
    const tasks = await TaskService.onGetDocs({
      paginationParams,
      queries: req.body.terms,
    });
    return res.status(200).json(
      new GetTasksApiResponse({
        tasks,
      }),
    );
  } catch (error) {
    return next(error);
  }
}

export async function createTask(
  req: Request<unknown, unknown, CreateTask>,
  res: Response,
  next: NextFunction,
) {
  try {
    const task = await TaskService.onCreateDoc({
      task: req.body,
    });
    return res.status(200).json(
      new TaskApiResponse({
        task,
      }),
    );
  } catch (error) {
    return next(error);
  }
}

export async function updateTask(
  req: Request<
    {
      taskId: string;
    },
    unknown,
    UpdateTask
  >,
  res: Response,
  next: NextFunction,
) {
  try {
    const task = await TaskService.onUpdateDocByIdOrThrow({
      taskId: req.params.taskId,
      updateTask: req.body,
    });
    return res.status(200).json(
      new TaskApiResponse({
        task,
      }),
    );
  } catch (error) {
    return next(error);
  }
}

export async function deleteTask(
  req: Request<{taskId: string}>,
  res: Response,
  next: NextFunction,
) {
  try {
    await TaskService.onUpdateDocByIdOrThrow({
      taskId: req.params.taskId,
      updateTask: {
        status: TaskStatus.Deleted,
      },
    });
    return res.status(200).json({
      message: 'Task deleted successfully',
    });
  } catch (error) {
    return next(error);
  }
}

export async function getTask(
  req: Request<{taskId: string}>,
  res: Response,
  next: NextFunction,
) {
  try {
    const task = await TaskService.onGetDocByIdOrThrow({
      taskId: req.params.taskId,
    });
    return res.status(200).json(
      new TaskApiResponse({
        task,
      }),
    );
  } catch (error) {
    return next(error);
  }
}
