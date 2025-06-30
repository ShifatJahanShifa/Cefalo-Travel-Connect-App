import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class Accommodation {
    async createAccommodation(data) {
        const latitude = data.latitude;
        const longitude = data.longitude;
        const [accommodation] = await db("accommodations").insert({
            accommodation_type: data.accommodation_type,
            accommodation_name: data.accommodation_name,
            location: db.raw(`ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography`, [longitude, latitude]),
        })
            .returning([
            'accommodation_id',
            'accommodation_type',
            'accommodation_name',
            db.raw('ST_Y(location::geometry) as latitude'),
            db.raw('ST_X(location::geometry) as longitude')
        ]);
        return accommodation;
    }
    async getAccommodations() {
        const accommodations = await db("accommodations").select("accommodation_id", "accommodation_type", "accommodation_name", db.raw("ST_Y(location::geometry) as latitude"), db.raw("ST_X(location::geometry) as longitude"))
            .orderBy("accommodation_name", 'asc');
        return accommodations;
    }
    async getAccommodationByTypeAndName(type, name) {
        const accommodation = await db("accommodations").select("accommodation_id", "accommodation_type", "accommodation_name", db.raw("ST_Y(location::geometry) as latitude"), db.raw("ST_X(location::geometry) as longitude"))
            .where({
            accommodation_type: type,
            accommodation_name: name
        })
            .first();
        return accommodation;
    }
    async updateAccommodation(accommodation_id, data) {
        const updates = {};
        if (data.accommodation_type)
            updates.accommodation_type = data.accommodation_type;
        if (data.accommodation_name)
            updates.accommodation_name = data.accommodation_name;
        const hasLat = data.latitude !== undefined;
        const hasLng = data.longitude !== undefined;
        if (hasLat || hasLng) {
            const existing = await db("accommodations")
                .where({ accommodation_id: accommodation_id })
                .select(db.raw("ST_Y(location::geometry) as latitude"), db.raw("ST_X(location::geometry) as longitude"))
                .first();
            const latitude = hasLat ? data.latitude : existing.latitude;
            const longitude = hasLng ? data.longitude : existing.longitude;
            updates.location = db.raw(`ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography`, [longitude, latitude]);
        }
        const [updated] = await db("accommodations")
            .where({ accommodation_id: accommodation_id })
            .update({ ...updates })
            .returning([
            "accommodation_type",
            "accommodation_name",
            db.raw("ST_Y(location::geometry) as latitude"),
            db.raw("ST_X(location::geometry) as longitude")
        ]);
        return updated;
    }
    async getAccommodationsByProximity(latitude, longitude, radius) {
        const accommodations = await db('accommodations')
            .select('accommodation_id', 'accommodation_type', 'accommodation_name', db.raw('ST_Y(location::geometry) as latitude'), db.raw('ST_X(location::geometry) as longitude'))
            .whereRaw(`ST_DWithin(location, ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography, ?)`, [longitude, latitude, radius]);
        return accommodations;
    }
    ;
    async getById(id) {
        const accommodation = await db("accommodations").select("accommodation_id", "accommodation_type", "accommodation_name", db.raw("ST_Y(location::geometry) as latitude"), db.raw("ST_X(location::geometry) as longitude"))
            .whereIn('accommodation_id', id);
        return accommodation;
    }
}
const accommodationDao = new Accommodation();
export default accommodationDao;
