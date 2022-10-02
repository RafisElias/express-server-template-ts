/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { Schema, model } from 'mongoose';
import { z } from 'zod';

export const Todo = z.object({
  content: z.string().min(1, 'O campo deve conter no mínimo um dígito'),
  done: z.boolean().default(false)
});

const todoId = z.object({
  id: z.string().min(1)
});

export const TodoWithId = Todo.merge(todoId);

export type TTodoProps = z.infer<typeof Todo>;
export type TodoWithIdProps = z.infer<typeof TodoWithId>;

const todoSchema = new Schema<TTodoProps>({
  content: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  }
});

todoSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

export const TodosModel = model<TodoWithIdProps>('todos', todoSchema);
