import request from 'supertest';
import express from 'express';
import brandsRouter from '../src/paths/brands';
import { logger } from '../src/middleware/logger';

const app = express();
app.use(express.json());
app.use(logger);
app.use('/brands', brandsRouter);

describe('Brand CRUD API', () => {
  let brandId: string;

  it('should create a brand', async () => {
    const res = await request(app).post('/brands').send({ title: 'Test Brand' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    brandId = res.body.id;
  });

  it('should get all brands', async () => {
    const res = await request(app).get('/brands');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a brand by id', async () => {
    const res = await request(app).get(`/brands/${brandId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', brandId);
  });

  it('should update a brand', async () => {
    const res = await request(app).put(`/brands/${brandId}`).send({ title: 'Updated Brand' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('title', 'Updated Brand');
  });

  it('should delete a brand', async () => {
    const res = await request(app).delete(`/brands/${brandId}`);
    expect(res.status).toBe(204);
  });
});
