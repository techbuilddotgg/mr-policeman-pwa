import { db } from '../common/database/db';
import { contributions } from '../common/database/tables';
import { eq } from 'drizzle-orm';

export class ContributionsService {
  constructor() {}

  async createContribution(data: typeof contributions.$inferInsert) {
    const res = await db
      .insert(contributions)
      .values(data)
      .returning()
      .execute();
    return res[0];
  }

  async getContributionById(id: string) {
    const res = await db
      .select()
      .from(contributions)
      .where(eq(contributions.id, id))
      .execute();
    return res[0];
  }

  async getContributions() {
    return await db.select().from(contributions).execute();
  }

  async deleteContribution(id: string) {
    await db.delete(contributions).where(eq(contributions.id, id)).execute();
  }
}
