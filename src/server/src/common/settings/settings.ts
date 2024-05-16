import * as env from 'env-var';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

const settings = {
  port: env.get('PORT').default(42069).asIntPositive(),
  postgresUrl: env.get('POSTGRES_URL').required().asString(),
  sessionSecret: env.get('SESSION_SECRET').required().asString(),
  googleClientId: env.get('GOOGLE_CLIENT_ID').required().asString(),
  googleClientSecret: env.get('GOOGLE_CLIENT_SECRET').required().asString(),
  googleCallbackUrl: env.get('GOOGLE_CALLBACK_URL').required().asString(),
  clientUrl: env.get('CLIENT_URL').required().asString(),
};

export default settings;
