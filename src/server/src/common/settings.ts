import * as env from 'env-var';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

const settings = {
  port: env.get('PORT').default(42069).asIntPositive(),
};

export default settings;
