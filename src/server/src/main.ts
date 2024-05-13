import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import settings from './common/settings';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(settings.port, () => {
  console.log(`Server is running on port ${settings.port}`);
});
