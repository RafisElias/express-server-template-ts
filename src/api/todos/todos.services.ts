import { QueryOptions, UpdateQuery } from 'mongoose';
import {
  TodosModel,
  type TTodoProps,
  type TodoWithIdProps
} from './todos.model';

export async function createTodo(data: TTodoProps) {
  const result = await TodosModel.create(data);
  return result.toJSON();
}

export async function findAllTodos(options: QueryOptions = { lean: true }) {
  return TodosModel.find({}, {}, options);
}

export async function findTodoById(
  todoId: string,
  options: QueryOptions = { lean: true }
) {
  return TodosModel.findById(todoId, {}, options);
}

export async function findAndUpdateTodo(
  todoId: string,
  update: UpdateQuery<TodoWithIdProps>,
  options: QueryOptions
) {
  return TodosModel.findByIdAndUpdate(todoId, update, options);
}

export async function findAndDeleteTodo(
  todoId: string,
  options: QueryOptions = { lean: true, new: true }
) {
  return TodosModel.findByIdAndDelete(todoId, options);
}
