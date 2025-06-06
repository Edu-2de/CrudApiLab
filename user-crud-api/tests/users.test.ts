import request from 'supertest';
import express from 'express';
import usersRouter from '../src/paths/users';
import { logger } from '../src/middleware/logger';
// Remova: import { describe, it } from 'node:test';

const app = express();
app.use(express.json());
app.use(logger);
app.use('/users', usersRouter);

describe('User CRUD API', () => {
  let userId: string;

  it('should create a user', async () => {
    const res = await request(app).post('/users').send({ name: 'Test', email: 'test@test.com' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    userId = res.body.id;
  });

  it('should get all users', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a user by id', async () => {
    const res = await request(app).get(`/users/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', userId);
  });

  it('should update a user', async () => {
    const res = await request(app).put(`/users/${userId}`).send({ name: 'Updated Name' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name', 'Updated Name');
  });

  it('should delete a user', async () => {
    const res = await request(app).delete(`/users/${userId}`);
    expect(res.status).toBe(204);
  });
});

// Remova a função expect customizada do final do arquivo