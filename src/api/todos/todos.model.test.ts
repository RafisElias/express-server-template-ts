import { describe, it, expect } from 'vitest';

describe('Todo model', () => {
  it('should create a new Todo', () => {
    expect({
      content: 'make a test',
      done: false
    }).toEqual({
      content: 'make a test',
      done: false
    });
  });
});
