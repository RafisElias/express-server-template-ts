/* eslint-disable no-underscore-dangle */
import { describe, expect, it } from 'vitest';
import request from 'supertest';

import app from '../../app';
import { type TodoWithIdProps } from './todos.model';

const createTodoObject = {
  content: 'Create todo',
  done: false
};

const updateTodoObject = {
  content: 'Updated todo',
  done: true
};

let todo = {} as TodoWithIdProps;

describe('GET /api/v1/todos', () => {
  it('should return a empty array', async () => {
    await request(app)
      .get('/api/v1/todos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
      });
  });
});

describe('POST /api/v1/todos', () => {
  it('should return an error if the todo is invalid', async () => {
    await request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .send({ content: '' })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      });
  });

  it('should return with the inserted todo', async () => {
    await request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .send(createTodoObject)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('content');
        expect(response.body.content).toBe('Create todo');
        expect(response.body).toHaveProperty('done');
        expect(response.body.done).toBe(false);
        todo = response.body;
      });
  });
});

describe('GET /api/v1/todos/:id', () => {
  it('should return a not found error', async () => {
    await request(app)
      .get('/api/v1/todos/63349c701dc3a8aef4b3553a')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404);
  });

  it('should return a invalid ID error', async () => {
    await request(app)
      .get('/api/v1/todos/adsasdasdasasd')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);
  });

  it('should return a Todo object', async () => {
    await request(app)
      .get(`/api/v1/todos/${todo.id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toBe(todo.id);
        expect(response.body).toHaveProperty('content');
        expect(response.body.content).toBe(todo.content);
        expect(response.body).toHaveProperty('done');
        expect(response.body.done).toBe(todo.done);
      });
  });
});

describe('PUT /api/v1/todos/:id', () => {
  it('should return a not found error', async () => {
    await request(app)
      .put('/api/v1/todos/63349c701dc3a8aef4b3553a')
      .set('Accept', 'application/json')
      .send(updateTodoObject)
      .expect('Content-Type', /json/)
      .expect(404);
  });

  it('should return a invalid ID error', async () => {
    await request(app)
      .put('/api/v1/todos/adsasdasdasasd')
      .set('Accept', 'application/json')
      .send(updateTodoObject)
      .expect('Content-Type', /json/)
      .expect(422);
  });

  it('should update and return the updated Todo with done value equals to True', async () => {
    await request(app)
      .put(`/api/v1/todos/${todo.id}`)
      .set('Accept', 'application/json')
      .send(updateTodoObject)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('content');
        expect(response.body).toHaveProperty('done');
        expect(response.body.done).toBe(true);
      });
  });

  it('should update and return the updated Todo with done value equals to False', async () => {
    await request(app)
      .put(`/api/v1/todos/${todo.id}`)
      .set('Accept', 'application/json')
      .send({ ...updateTodoObject, done: false })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('content');
        expect(response.body).toHaveProperty('done');
        expect(response.body.done).toBe(false);
      });
  });
});

describe('DELETE /api/v1/todos/:id', () => {
  it('should return a not found error', async () => {
    await request(app)
      .delete('/api/v1/todos/63349c701dc3a8aef4b3553a')
      .set('Accept', 'application/json')
      .expect(404);
  });

  it('should return a invalid ID error', async () => {
    await request(app)
      .delete('/api/v1/todos/adsasdasdasasd')
      .set('Accept', 'application/json')
      .expect(422);
  });

  it('should delete the Todo and return a 204 statusCode', async () => {
    await request(app)
      .delete(`/api/v1/todos/${todo.id}`)
      .set('Accept', 'application/json')
      .expect(204);
  });

  it('should return 404 status when try get the deleted Todo', async () => {
    await request(app)
      .get(`/api/v1/todos/${todo.id}`)
      .set('Accept', 'application/json')
      .expect(404);
  });
});
