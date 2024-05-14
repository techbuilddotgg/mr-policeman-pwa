import { db } from '../common/database/db';
import { radars } from '../common/database/tables';
import { eq } from 'drizzle-orm';

export class RadarService {
  constructor() {}

  public async getRadarById(id: string) {
    const r = await db.select().from(radars).where(eq(radars.id, id)).execute();
    return r[0];
  }

  public async getRadars() {
    return await db.select().from(radars).execute();
  }
}
