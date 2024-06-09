import {
  pgTable,
  uuid,
  integer,
  varchar,
  boolean,
  timestamp,
  pgEnum,
  decimal,
} from 'drizzle-orm/pg-core';

export enum Provider {
  Email = 'email',
  Google = 'google',
}

export const providerEnum = pgEnum('provider', [
  Provider.Email,
  Provider.Google,
]);

export const radars = pgTable('radars', {
  id: uuid('id').primaryKey().defaultRandom(),
  latitude: decimal('latitude').notNull(),
  longitude: decimal('longitude').notNull(),
  speedLimit: integer('speed_limit').notNull(),
  description: varchar('description'),
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
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const controls = pgTable('controls', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name').notNull(),
  latitude: decimal('latitude').notNull(),
  longitude: decimal('longitude').notNull(),
  description: varchar('description'),
  upVotes: integer('up_votes').default(0).notNull(),
  downVotes: integer('down_votes').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
