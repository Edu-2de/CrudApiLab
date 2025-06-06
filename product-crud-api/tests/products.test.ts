import request from 'supertest';
import express from 'express';
import productsRouter from '../src/paths/products';
import { logger } from '../src/middleware/logger';

const app = express();
app.use(express.json());
app.use(logger);
app.use('/products', productsRouter);

describe('Product CRUD API', () => {
  let productId: string;

  it('should create a product', async () => {
    const res = await request(app).post('/products').send({ title: 'Test Product', price: '10.00', brandId: '1' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    productId = res.body.id;
  });

  it('should get all products', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a product by id', async () => {
    const res = await request(app).get(`/products/${productId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', productId);
  });

  it('should get a product details by id', async () => {
    const res = await request(app).get(`/products/${productId}/details`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('product.id', productId);
  });

  it('should update a product', async () => {
    const res = await request(app).put(`/products/${productId}`).send({ title: 'Updated Product' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('title', 'Updated Product');
  });

  it('should delete a product', async () => {
    const res = await request(app).delete(`/products/${productId}`);
    expect(res.status).toBe(204);
  });
});
