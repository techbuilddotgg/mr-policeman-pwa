import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import settings from './common/settings/settings';
import session from 'express-session';
import passport from 'passport';
import 'common/auth/passport';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: '*',
  })
);

app.use(
  session({
    secret: settings.sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(settings.port, () => {
  console.log(`Server is running on port ${settings.port}`);
});
