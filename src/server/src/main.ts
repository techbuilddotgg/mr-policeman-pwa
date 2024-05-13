import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import settings from './common/settings/settings';
import session from 'express-session';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import './common/auth/passport';

dotenv.config();

const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mr. Policeman API',
      version: '1.0.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
    },
    servers: [
      {
        url: `http://localhost:${settings.port}`,
      },
    ],
  },
  apis: ['src/main.ts'],
};

const specs = swaggerJsdoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

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

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns a hello message
 *     tags: [Hello]
 *     responses:
 *       200:
 *         description: Hello World message
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello World
 */
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(settings.port, () => {
  console.log(`Server is running on port ${settings.port}`);
});
