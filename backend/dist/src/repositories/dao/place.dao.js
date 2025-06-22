var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class Place {
    createPlace(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { latitude, longitude } = data;
            const [place] = yield db("places")
                .insert({
                place_name: data.place_name,
                location: db.raw(`ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography`, [longitude, latitude]),
            })
                .returning([
                'place_name',
                db.raw('ST_Y(location::geometry) as latitude'),
                db.raw('ST_X(location::geometry) as longitude'),
            ]);
            return place;
        });
    }
    getPlaces() {
        return __awaiter(this, void 0, void 0, function* () {
            const places = yield db("places")
                .select("place_id", "place_name", db.raw("ST_Y(location::geometry) as latitude"), db.raw("ST_X(location::geometry) as longitude"))
                .orderBy("place_name", "asc");
            return places;
        });
    }
    getPlaceByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const place = yield db("places")
                .select("place_id", "place_name", db.raw("ST_Y(location::geometry) as latitude"), db.raw("ST_X(location::geometry) as longitude"))
                .where({
                place_name: name,
            })
                .first();
            return place;
        });
    }
    updatePlace(place_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updates = {};
            if (data.place_name)
                updates.place_name = data.place_name;
            const hasLat = data.latitude !== undefined;
            const hasLng = data.longitude !== undefined;
            if (hasLat || hasLng) {
                const existing = yield db("places")
                    .where({ place_id })
                    .select(db.raw("ST_Y(location::geometry) as latitude"), db.raw("ST_X(location::geometry) as longitude"))
                    .first();
                const latitude = hasLat ? data.latitude : existing.latitude;
                const longitude = hasLng ? data.longitude : existing.longitude;
                updates.location = db.raw(`ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography`, [longitude, latitude]);
            }
            const [updated] = yield db("places")
                .where({ place_id })
                .update(updates)
                .returning([
                "place_name",
                db.raw("ST_Y(location::geometry) as latitude"),
                db.raw("ST_X(location::geometry) as longitude"),
            ]);
            return updated;
        });
    }
    getPlacesByProximity(latitude, longitude, radius) {
        return __awaiter(this, void 0, void 0, function* () {
            const places = yield db("places")
                .select("place_id", "place_name", db.raw("ST_Y(location::geometry) as latitude"), db.raw("ST_X(location::geometry) as longitude"))
                .whereRaw(`ST_DWithin(location, ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography, ?)`, [longitude, latitude, radius]);
            return places;
        });
    }
    ;
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const place = yield db("places")
                .select("place_id", "place_name", db.raw("ST_Y(location::geometry) as latitude"), db.raw("ST_X(location::geometry) as longitude"))
                .whereIn('place_id', id);
            return place;
        });
    }
}
const placeDao = new Place();
export default placeDao;
