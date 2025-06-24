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
class Accommodation {
    createAccommodation(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const latitude = data.latitude;
            const longitude = data.longitude;
            const [accommodation] = yield db("accommodations").insert({
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
        });
    }
    getAccommodations() {
        return __awaiter(this, void 0, void 0, function* () {
            const accommodations = yield db("accommodations").select("accommodation_id", "accommodation_type", "accommodation_name", db.raw("ST_Y(location::geometry) as latitude"), db.raw("ST_X(location::geometry) as longitude"))
                .orderBy("accommodation_name", 'asc');
            return accommodations;
        });
    }
    getAccommodationByTypeAndName(type, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const accommodation = yield db("accommodations").select("accommodation_id", "accommodation_type", "accommodation_name", db.raw("ST_Y(location::geometry) as latitude"), db.raw("ST_X(location::geometry) as longitude"))
                .where({
                accommodation_type: type,
                accommodation_name: name
            })
                .first();
            return accommodation;
        });
    }
    updateAccommodation(accommodation_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updates = {};
            if (data.accommodation_type)
                updates.accommodation_type = data.accommodation_type;
            if (data.accommodation_name)
                updates.accommodation_name = data.accommodation_name;
            const hasLat = data.latitude !== undefined;
            const hasLng = data.longitude !== undefined;
            if (hasLat || hasLng) {
                const existing = yield db("accommodations")
                    .where({ accommodation_id: accommodation_id })
                    .select(db.raw("ST_Y(location::geometry) as latitude"), db.raw("ST_X(location::geometry) as longitude"))
                    .first();
                const latitude = hasLat ? data.latitude : existing.latitude;
                const longitude = hasLng ? data.longitude : existing.longitude;
                updates.location = db.raw(`ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography`, [longitude, latitude]);
            }
            const [updated] = yield db("accommodations")
                .where({ accommodation_id: accommodation_id })
                .update(Object.assign({}, updates))
                .returning([
                "accommodation_type",
                "accommodation_name",
                db.raw("ST_Y(location::geometry) as latitude"),
                db.raw("ST_X(location::geometry) as longitude")
            ]);
            return updated;
        });
    }
    getAccommodationsByProximity(latitude, longitude, radius) {
        return __awaiter(this, void 0, void 0, function* () {
            const accommodations = yield db('accommodations')
                .select('accommodation_id', 'accommodation_type', 'accommodation_name', db.raw('ST_Y(location::geometry) as latitude'), db.raw('ST_X(location::geometry) as longitude'))
                .whereRaw(`ST_DWithin(location, ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography, ?)`, [longitude, latitude, radius]);
            return accommodations;
        });
    }
    ;
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const accommodation = yield db("accommodations").select("accommodation_id", "accommodation_type", "accommodation_name", db.raw("ST_Y(location::geometry) as latitude"), db.raw("ST_X(location::geometry) as longitude"))
                .whereIn('accommodation_id', id);
            return accommodation;
        });
    }
}
const accommodationDao = new Accommodation();
export default accommodationDao;
