import {Schema, model} from 'mongoose';
import {Task, TaskStatus} from '../routes/dto/task.dto';
import {modelsName} from './constans/constans';

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      min: 1,
      required: true,
    },
    description: {
      type: String,
      min: 1,
      required: true,
    },
    status: {
      type: String,
      enum: TaskStatus,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const TaskModel = model<Task>(modelsName.Task, TaskSchema);

export default TaskModel;
