import {JSONSchemaType} from 'ajv';
import {CreateTask, TaskStatus, UpdateTask} from '../dto/task.dto';

export const createTaskDtoSchemaValidator: JSONSchemaType<CreateTask> = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
  },
  required: ['title', 'description'],
  additionalProperties: false,
};

export const updateTaskDtoSchemaValidator: JSONSchemaType<UpdateTask> = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      enum: [TaskStatus.Created, TaskStatus.Completed, TaskStatus.Deleted],
      nullable: true,
    },
    title: {
      type: 'string',
      nullable: true,
    },
    description: {
      type: 'string',
      nullable: true,
    },
  },
  required: [],
  additionalProperties: false,
};
