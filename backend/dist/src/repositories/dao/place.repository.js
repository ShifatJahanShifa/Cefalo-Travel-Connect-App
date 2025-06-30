import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class Place {
    async createPlace(data) {
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
    async getPlaces() {
        const places = await db("places")
            .select("place_id", "place_name", db.raw("ST_Y(location::geometry) as latitude"), db.raw("ST_X(location::geometry) as longitude"))
            .orderBy("place_name", "asc");
        return places;
    }
    async getPlaceByName(name) {
        const place = await db("places")
            .select("place_id", "place_name", db.raw("ST_Y(location::geometry) as latitude"), db.raw("ST_X(location::geometry) as longitude"))
            .where({
            place_name: name,
        })
            .first();
        return place;
    }
    async updatePlace(place_id, data) {
        const updates = {};
        if (data.place_name)
            updates.place_name = data.place_name;
        const hasLat = data.latitude !== undefined;
        const hasLng = data.longitude !== undefined;
        if (hasLat || hasLng) {
            const existing = await db("places")
                .where({ place_id })
                .select(db.raw("ST_Y(location::geometry) as latitude"), db.raw("ST_X(location::geometry) as longitude"))
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
    async getPlacesByProximity(latitude, longitude, radius) {
        const places = await db("places")
            .select("place_id", "place_name", db.raw("ST_Y(location::geometry) as latitude"), db.raw("ST_X(location::geometry) as longitude"))
            .whereRaw(`ST_DWithin(location, ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography, ?)`, [longitude, latitude, radius]);
        return places;
    }
    ;
    async getById(id) {
        const place = await db("places")
            .select("place_id", "place_name", db.raw("ST_Y(location::geometry) as latitude"), db.raw("ST_X(location::geometry) as longitude"))
            .whereIn('place_id', id);
        return place;
    }
}
const placeDao = new Place();
export default placeDao;
