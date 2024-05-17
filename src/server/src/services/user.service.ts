import { db } from '../common/database/db';
import { users } from '../common/database/tables';
import { eq } from 'drizzle-orm';

export class UserService {
  constructor() {}

  async doesUserExist(email: string) {
    const user = await this.getUserByEmail(email);
    return !!user;
  }

  async createUser(username: string, email: string, password?: string) {
    const user = await db
      .insert(users)
      .values({ username: username, email: email, password: password })
      .returning();
    return user[0];
  }

  async getUserByEmail(email: string) {
    const user = await db.select().from(users).where(eq(users.email, email));
    return user[0];
  }

  async deleteUser(email: string) {
    await db.delete(users).where(eq(users.email, email)).execute();
  }
}
