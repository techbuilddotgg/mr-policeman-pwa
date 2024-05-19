import {
  pgTable,
  uuid,
  integer,
  varchar,
  boolean,
  timestamp,
    pgEnum
} from 'drizzle-orm/pg-core';

export enum Provider {
    Email = 'email',
    Google = 'google',
}
export const providerEnum = pgEnum('provider', [Provider.Email, Provider.Google]);

export const radars = pgTable('radars', {
  id: uuid('id').primaryKey().defaultRandom(),
  latitude: integer('latitude').notNull(),
  longitude: integer('longitude').notNull(),
  speedLimit: integer('speed_limit').notNull(),
});

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username').notNull(),
  email: varchar('email').notNull().unique(),
  password: varchar('password'),
  provider: providerEnum('provider').default(Provider.Email).notNull(),
});

export const notificationSettings = pgTable('notification_settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id)
    .unique(),
  enabled: boolean('enabled').default(true).notNull(),
});

export const contributions = pgTable('contributions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  text: varchar('description').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
