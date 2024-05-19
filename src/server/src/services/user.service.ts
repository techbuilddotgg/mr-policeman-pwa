import { db } from '../common/database/db';
import {Provider, users} from '../common/database/tables';
import { eq } from 'drizzle-orm';
import {UserUpdate} from "../modules/users/user";
import argon from "argon2";

export class UserService {
  constructor() {}

  async doesUserExist(email: string) {
    const user = await this.getUserByEmail(email);
    return !!user;
  }

  async createUser(username: string, email: string, provider: Provider, password?: string) {
    const user = await db
      .insert(users)
      .values({ username: username, email: email, password: password, provider: provider })
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

  async updateUser(id: string, newUserData: UserUpdate) {
    const user = await db.select().from(users).where(eq(users.id, id));
    const updatedUserData = {
      username: newUserData.username,
    } as UserUpdate

    if(user[0].provider === Provider.Email) {
        updatedUserData.password = await argon.hash(newUserData.password);
    }
    const updatedUser = await db
      .update(users)
      .set(updatedUserData)
      .where(eq(users.id, id))
      .returning();
    return updatedUser[0];
  }
}
