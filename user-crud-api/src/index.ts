import express from 'express';
import usersRouter from './paths/users';
import { logger } from './middleware/logger';

const app = express();

app.use(express.json());
app.use(logger);

app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.json({ message: 'User CRUD API (TypeScript) is running.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`User CRUD API listening on port ${PORT}`);
});