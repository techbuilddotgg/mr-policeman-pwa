import { db } from '../common/database/db';
import { notificationSettings, users } from '../common/database/tables';
import { eq } from 'drizzle-orm';

export class SettingsService {
  constructor() {}

  public async getNotificationSettingsByUser(email: string) {
    const res = await db
      .select()
      .from(notificationSettings)
      .innerJoin(users, eq(notificationSettings.userId, users.id))
      .where(eq(users.email, email))
      .execute();
    return res[0];
  }

  public createNotificationSettings(userId: string) {
    return db
      .insert(notificationSettings)
      .values({ userId })
      .returning()
      .execute();
  }

  public updateNotificationSettings(
    userId: string,
    settings: { enabled: boolean }
  ) {
    return db
      .update(notificationSettings)
      .set(settings)
      .where(eq(notificationSettings.userId, userId))
      .execute();
  }
}
