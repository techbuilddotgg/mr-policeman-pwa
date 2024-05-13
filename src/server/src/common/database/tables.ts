import {
  pgTable,
  uuid,
  pgEnum,
  integer,
  varchar,
  boolean,
} from 'drizzle-orm/pg-core';

export const radars = pgTable('radars', {
  id: uuid('id').primaryKey(),
  speedLimit: integer('speed_limit').notNull(),
});

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username').notNull(),
  email: varchar('email').notNull(),
});

export const notificationSettings = pgTable('notification_settings', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  enabled: boolean('enabled').default(true),
});

export const contributions = pgTable('contributions', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  latitude: integer('latitude').notNull(),
  longitude: integer('longitude').notNull(),
  description: varchar('description').notNull(),
  createdAt: integer('created_at').notNull(),
});
