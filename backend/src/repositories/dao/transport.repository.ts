import { transportCreation, transportUpdation, getTransport } from "../../types/transport.type.ts";
import { ITransport } from "../interfaces/transport.interface.ts";
import { Knex } from "knex";
import { dbClient } from "../../db/db.ts";

const db: Knex = dbClient.getConnection();

class Transport implements ITransport {
  async createTransport(data: transportCreation): Promise<getTransport> {
    const [transport] = await db("transports")
        .insert({
            transport_type: data.transport_type,
            transport_name: data.transport_name,
      })
      .returning([
        "transport_id",
        "transport_type",
        "transport_name"
      ]);

    return transport;
  }

  async getTransports(): Promise<getTransport[]> {
    const transports: getTransport[] = await db("transports")
      .select(
        "transport_id",
        "transport_type",
        "transport_name"
      )
      .orderBy("transport_name", "asc");

    return transports;
  }

  async getTransportByTypeAndName(type: string, name: string): Promise<getTransport> {
    const transport = await db("transports")
        .select(
            "transport_id",
            "transport_type",
            "transport_name"
            
        )
        .where({
            transport_type: type,
            transport_name: name,
        })
        .first();
    return transport
  }

    async updateTransport(transport_id: string, data: transportUpdation): Promise<transportCreation> {
        const updates: Record<string, any> = {};

        if (data.transport_type) updates.transport_type = data.transport_type;
        if (data.transport_name) updates.transport_name = data.transport_name;
        

        const [updated] = await db("transports")
        .where({ transport_id })
        .update(updates)
        .returning([
            "transport_type",
            "transport_name",
          ]);

        return updated;
    }

    async getTransportsByProximity(latitude: number,longitude: number,radius: number): Promise<getTransport[]> {
        const transports = await db("transports")
        .select(
            "transport_id",
            "transport_type",
            "transport_name",
            "cost_per_person",
            "starting_location_name",
            "ending_location_name",
            db.raw("ST_Y(starting_location::geometry) as starting_location_latitude"),
            db.raw("ST_X(starting_location::geometry) as starting_location_longitude"),
            db.raw("ST_Y(ending_location::geometry) as ending_location_latitude"),
            db.raw("ST_X(ending_location::geometry) as ending_location_longitude")
        )
        .whereRaw(
            `ST_DWithin(starting_location, ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography, ?)
            OR ST_DWithin(ending_location, ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography, ?)`,
            [longitude, latitude, radius, longitude, latitude, radius]
        );

        return transports;
    }

    async getById(id: number[]): Promise<getTransport[]> {
        const transport = await db("transports")
            .select(
                "transport_id",
                "transport_type",
                "transport_name"
            )
            .whereIn(
                'transport_id', id
            );
            

        return transport;
    }
}

const transportDao = new Transport();
export default transportDao;
