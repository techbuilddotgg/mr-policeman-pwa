import { defineConfig } from 'drizzle-kit';
import settings from './src/common/settings/settings';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/common/database/tables.ts',
  out: './drizzle',
  dbCredentials: {
    url: settings.postgresUrl,
  },
});
