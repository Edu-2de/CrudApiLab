import express from 'express';
import productsRouter from './paths/products';
import brandsRouter from './paths/brands';

const app = express();
app.use(express.json());

// Aqui você define o prefixo das rotas:
app.use('/products', productsRouter);
app.use('/brands', brandsRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});