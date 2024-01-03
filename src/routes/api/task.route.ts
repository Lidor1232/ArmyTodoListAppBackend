import {Application} from 'express';
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from '../controllers/task/task.controller';
import jsonSchemaValidator from '../middlewares/validation.middleware';
import {
  createTaskDtoSchemaValidator,
  getTasksDtoSchemaValidator,
  updateTaskDtoSchemaValidator,
} from '../validators/task.ajv';

export default function (app: Application) {
  app.post('/tasks', jsonSchemaValidator(getTasksDtoSchemaValidator), getTasks);

  app.post(
    '/task/create',
    jsonSchemaValidator(createTaskDtoSchemaValidator),
    createTask,
  );

  app.patch(
    '/task/:taskId/update',
    jsonSchemaValidator(updateTaskDtoSchemaValidator),
    updateTask,
  );

  app.delete('/task/:taskId/delete', deleteTask);

  app.get('/task/:taskId/details', getTask);
}
