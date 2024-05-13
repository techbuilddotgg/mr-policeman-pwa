import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import settings from '../settings/settings';

const queryClient = postgres(settings.postgresUrl);
export const db = drizzle(queryClient);
