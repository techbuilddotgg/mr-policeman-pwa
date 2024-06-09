import { db } from '../common/database/db';
import { radars } from '../common/database/tables';
import { eq } from 'drizzle-orm';
import axios, { AxiosResponse } from 'axios';
import settings from '../common/settings/settings';

export class RadarService {
  constructor() {}

  public async downloadRadars() {
    type Radars = {
      elements: {
        lat: number;
        lon: number;
        tags?: {
          description: string;
          maxspeed: number;
        };
      }[];
    };

    const res = (await axios.get(
      settings.radarApiEndpoint
    )) as AxiosResponse<Radars>;

    const validRadars = res.data.elements
      .filter((element) => element.tags?.description && element.tags?.maxspeed)
      .map((element) => ({
        lat: element.lat,
        lon: element.lon,
        tags: {
          description: element.tags?.description,
          maxspeed: element.tags?.maxspeed,
        },
      }))
      .filter(
        (element) =>
          element.tags.description !== undefined &&
          element.tags.maxspeed !== undefined
      );

    const downloadedRadars = validRadars.map((element) => ({
      latitude: element.lat.toString(),
      longitude: element.lon.toString(),
      description: element.tags?.description,
      speedLimit: element.tags?.maxspeed || 0,
    }));

    await db.insert(radars).values(downloadedRadars).execute();
  }

  public async getRadarById(id: string) {
    const r = await db.select().from(radars).where(eq(radars.id, id)).execute();
    return r[0];
  }

  public async getRadars() {
    return await db.select().from(radars).execute();
  }
}
