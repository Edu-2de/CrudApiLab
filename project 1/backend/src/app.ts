import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { setupDB, testConnection } from './database/setup';
import authRoutes from './routes/authRoutes';
import bannerRoutes from './routes/bannerRoutes';
import categoryRoutes from './routes/categoryRoutes';
import orderItemRoutes from './routes/orderItemRoutes';
import orderRoutes from './routes/orderRoutes';
import productRoutes from './routes/productRoutes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    console.log('Starting server...');

    await testConnection();
    console.log('Database connection successful');

    await setupDB();
    console.log('Database setup completed');

    app.use('/user', authRoutes);
    app.use('/banner', bannerRoutes);
    app.use('/category', categoryRoutes);
    app.use('/orderItem', orderItemRoutes);
    app.use('/order', orderRoutes);
    app.use('/product', productRoutes);
    

    app.listen(PORT, () => {
      console.log('Server running on port: ' + PORT);
      console.log(`Test DB: http://localhost:${PORT}/test-db`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
