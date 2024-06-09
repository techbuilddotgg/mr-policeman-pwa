import { eq } from 'drizzle-orm';
import { db } from '../common/database/db';
import { controls } from '../common/database/tables';

export class ControlsService {
  constructor() {}

  async createControl(data: typeof controls.$inferInsert) {
    const res = await db.insert(controls).values(data).returning().execute();
    return res[0];
  }

  async getControlById(id: string) {
    const res = await db
      .select()
      .from(controls)
      .where(eq(controls.id, id))
      .execute();
    return res[0];
  }

  async getControls() {
    return await db.select().from(controls).execute();
  }

  async deleteControl(id: string) {
    await db.delete(controls).where(eq(controls.id, id)).execute();
  }

  async upVoteControl(id: string) {
    const control = await this.getControlById(id);
    await db
      .update(controls)
      .set({ upVotes: control.upVotes + 1 })
      .where(eq(controls.id, id))
      .execute();
  }

  async downVoteControl(id: string) {
    const control = await this.getControlById(id);
    await db
      .update(controls)
      .set({ downVotes: control.downVotes + 1 })
      .where(eq(controls.id, id))
      .execute();
  }
}
