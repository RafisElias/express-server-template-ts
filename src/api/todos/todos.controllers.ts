/* eslint-disable import/prefer-default-export */
import { Response, Request } from 'express';
import {
  findAllTodos,
  createTodo,
  findTodoById,
  findAndUpdateTodo,
  findAndDeleteTodo
} from './todos.services';
import type { TodoWithIdProps, TTodoProps } from './todos.model';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

export async function createTodoHandler(
  req: Request<{}, TodoWithIdProps, TTodoProps>,
  res: Response<TodoWithIdProps>
) {
  const result = await createTodo(req.body);

  res.status(201).json(result);
}

export async function findAllTodosHandler(
  _: Request,
  res: Response<TodoWithIdProps[]>
) {
  const result = await findAllTodos({ lean: false });
  res.status(200).json(result);
}

export async function findTodoByIdHandler(
  req: Request<ParamsWithId, TodoWithIdProps, {}>,
  res: Response<TodoWithIdProps>
) {
  const todoId = req.params.id;
  const result = await findTodoById(todoId, { lean: false });

  if (!result) {
    res.status(404);
    throw new Error(`Todo with id "${todoId}" not found`);
  }
  res.status(200).json(result);
}

export async function updateTodoHandler(
  req: Request<ParamsWithId, TodoWithIdProps, TTodoProps>,
  res: Response<TodoWithIdProps>
) {
  const todoId = req.params.id;
  const update = req.body;
  const updatedTodo = await findAndUpdateTodo(todoId, update, {
    new: true,
    lean: false
  });

  if (!updatedTodo) {
    res.status(404);
    throw new Error(`Todo with id ${req.params.id} not found`);
  }
  res.status(200).json(updatedTodo);
}

export async function deleteTodoHandler(
  req: Request<ParamsWithId, {}, {}>,
  res: Response<{}>
) {
  const todoId = req.params.id;
  const result = await findAndDeleteTodo(todoId, {
    lean: false
  });

  if (!result) {
    res.status(404);
    throw new Error(`Todo with id ${req.params.id} not found`);
  }
  res.status(204).send();
}
