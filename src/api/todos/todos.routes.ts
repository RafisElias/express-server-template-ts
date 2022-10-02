/* eslint-disable import/no-cycle */
import { Router } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { validateRequest } from '../../middleware/validateRequest.middleware';
import * as TodosControllers from './todos.controllers';
import { Todo } from './todos.model';

const router = Router();

router
  .route('/')
  .get(TodosControllers.findAllTodosHandler)
  .post(validateRequest({ body: Todo }), TodosControllers.createTodoHandler);

router
  .route('/:id')
  .get(
    validateRequest({ params: ParamsWithId }),
    TodosControllers.findTodoByIdHandler
  )
  .put(
    validateRequest({ params: ParamsWithId, body: Todo }),
    TodosControllers.updateTodoHandler
  )
  .delete(
    validateRequest({ params: ParamsWithId }),
    TodosControllers.deleteTodoHandler
  );

export default router;
