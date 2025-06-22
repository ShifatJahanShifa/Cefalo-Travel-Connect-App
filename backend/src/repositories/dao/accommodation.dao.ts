import { accommodationCreation, accommodationUpdation, getAccommodation } from "../../types/accommodation.type.ts";
import { IAccommodation } from "../interfaces/accommodation.interface.ts";
import { Knex } from "knex";
import { dbClient } from "../../db/db.ts";
import { AppError } from "../../utils/appError.ts";
const db: Knex = dbClient.getConnection();

class Accommodation implements IAccommodation {
    async createAccommodation(data: accommodationCreation): Promise<accommodationCreation> {
        const latitude = data.latitude
        const longitude = data.longitude

        const [accommodation] = await db("accommodations").insert({
            accommodation_type: data.accommodation_type,
            accommodation_name: data.accommodation_name,
            location: db.raw(`ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography`, [longitude, latitude]),
            cost_per_night: data.cost_per_night
        })
        .returning([
            'accommodation_type',
            'accommodation_name',
            'cost_per_night',
            db.raw('ST_Y(location::geometry) as latitude'),
            db.raw('ST_X(location::geometry) as longitude')
        ]) 

        return accommodation
    }

    async getAccommodations(): Promise<getAccommodation[]> {
        const accommodations: getAccommodation[] = await db("accommodations").select(
            "accommodation_id",
            "accommodation_type",
            "accommodation_name",
            "cost_per_night",
            db.raw("ST_Y(location::geometry) as latitude"),
            db.raw("ST_X(location::geometry) as longitude")
        )
        .orderBy("accommodation_name", 'asc')

        return accommodations;
    }

    async getAccommodationByTypeAndName(type: string, name: string): Promise<getAccommodation> {
        const accommodation = await db("accommodations").select(
            "accommodation_id",
            "accommodation_type",
            "accommodation_name",
            "cost_per_night",
            db.raw("ST_Y(location::geometry) as latitude"),
            db.raw("ST_X(location::geometry) as longitude")
        )
        .where({
            accommodation_type: type,
            accommodation_name: name
        })
        .first()

        return accommodation;
    }

    async updateAccommodation(accommodation_id: number, data: accommodationUpdation): Promise<accommodationCreation> {
        const updates: Record<string, any> = {};

        if (data.accommodation_type) updates.accommodation_type = data.accommodation_type;
        if (data.accommodation_name) updates.accommodation_name = data.accommodation_name;
        if (data.cost_per_night !== undefined) updates.cost_per_night = data.cost_per_night;

        const hasLat = data.latitude !== undefined;
        const hasLng = data.longitude !== undefined;

        if (hasLat || hasLng) {
            const existing = await db("accommodations")
            .where({accommodation_id: accommodation_id})
            .select(
                db.raw("ST_Y(location::geometry) as latitude"),
                db.raw("ST_X(location::geometry) as longitude")
            )
            .first();

            const latitude = hasLat ? data.latitude : existing.latitude;
            const longitude = hasLng ? data.longitude : existing.longitude;

            updates.location = db.raw(`ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography`, [longitude, latitude]);
        }

        const [updated] = await db("accommodations")
            .where({accommodation_id: accommodation_id})
            .update({...updates})
            .returning([
            "accommodation_type",
            "accommodation_name",
            "cost_per_night",
            db.raw("ST_Y(location::geometry) as latitude"),
            db.raw("ST_X(location::geometry) as longitude")
            ]);

        return updated;
    }

    async getAccommodationsByProximity (latitude: number,longitude: number,radius: number): Promise<getAccommodation[]> {
        const accommodations: getAccommodation[] = await db('accommodations')
            .select(
            'accommodation_id',
            'accommodation_type',
            'accommodation_name',
            'cost_per_night',
            db.raw('ST_Y(location::geometry) as latitude'),
            db.raw('ST_X(location::geometry) as longitude')
            )
            .whereRaw(
            `ST_DWithin(location, ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography, ?)`,
                [longitude, latitude, radius]
            );
        
        return accommodations
    };

    async getById(id: number[]): Promise<getAccommodation[]> {
        const accommodation = await db("accommodations").select(
            "accommodation_id",
            "accommodation_type",
            "accommodation_name",
            "cost_per_night",
            db.raw("ST_Y(location::geometry) as latitude"),
            db.raw("ST_X(location::geometry) as longitude")
        )
        .whereIn(
            'accommodation_id', id
        )
       

        return accommodation;
    }
}

const accommodationDao: Accommodation = new Accommodation()
export default accommodationDao