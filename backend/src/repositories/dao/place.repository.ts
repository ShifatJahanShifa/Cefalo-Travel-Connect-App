import { placeCreation, getPlace, placeUpdation } from "../../types/place.type.ts"
import { IPlace } from "../interfaces/place.interface.ts";
import { Knex } from "knex";
import { dbClient } from "../../db/db.ts";
import { AppError } from "../../utils/appError.ts";
const db: Knex = dbClient.getConnection();

class Place implements IPlace {
    async createPlace(data: placeCreation): Promise<getPlace> {

        const { latitude, longitude } = data;

        const [place] = await db("places")
        .insert({
            place_name: data.place_name,
            location: db.raw(`ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography`, [longitude, latitude]),
        })
        .returning([
            'place_id',
            'place_name',
            db.raw('ST_Y(location::geometry) as latitude'),
            db.raw('ST_X(location::geometry) as longitude'),
        ]);

        return place;
    }

    async getPlaces(): Promise<getPlace[]> {
        const places: getPlace[] = await db("places")
        .select(
            "place_id",
            "place_name",
            db.raw("ST_Y(location::geometry) as latitude"),
            db.raw("ST_X(location::geometry) as longitude")
        )
        .orderBy("place_name", "asc");

        return places;
        
    }

    async getPlaceByName(name: string): Promise<getPlace> {
        
        const place = await db("places")
        .select(
            "place_id",
            "place_name",
            db.raw("ST_Y(location::geometry) as latitude"),
            db.raw("ST_X(location::geometry) as longitude")
        )
        .where({
            place_name: name,
        })
        .first();

        return place;
       
    }

    async updatePlace(place_id: string, data: placeUpdation): Promise<placeCreation> {
        
        const updates: Record<string, any> = {};

        if (data.place_name) updates.place_name = data.place_name;

        const hasLat = data.latitude !== undefined;
        const hasLng = data.longitude !== undefined;

        if (hasLat || hasLng) {
        const existing = await db("places")
            .where({ place_id })
            .select(
            db.raw("ST_Y(location::geometry) as latitude"),
            db.raw("ST_X(location::geometry) as longitude")
            )
            .first();

        const latitude = hasLat ? data.latitude : existing.latitude;
        const longitude = hasLng ? data.longitude : existing.longitude;

        updates.location = db.raw(`ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography`, [longitude, latitude]);
        }

        const [updated] = await db("places")
        .where({ place_id })
        .update(updates)
        .returning([
            "place_name",
            db.raw("ST_Y(location::geometry) as latitude"),
            db.raw("ST_X(location::geometry) as longitude"),
        ]);

        return updated;
        
    }

    async getPlacesByProximity(latitude: number, longitude: number, radius: number): Promise<getPlace[]> {

        const places: getPlace[] = await db("places")
        .select(
            "place_id",
            "place_name",
            db.raw("ST_Y(location::geometry) as latitude"),
            db.raw("ST_X(location::geometry) as longitude")
        )
        .whereRaw(
            `ST_DWithin(location, ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography, ?)`,
            [longitude, latitude, radius]
        );

        return places;
    };

    async getById(id: string[]): Promise<getPlace[]> {
        const place = await db("places")
        .select(
            "place_id",
            "place_name",
            db.raw("ST_Y(location::geometry) as latitude"),
            db.raw("ST_X(location::geometry) as longitude")
        )
        .whereIn(
            'place_id', id
        )
        

        return place;
    }
}

const placeDao: Place = new Place()
export default placeDao