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
class Restaurant {
    createRestaurant(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { latitude, longitude } = data;
            const [restaurant] = yield db("restaurants")
                .insert({
                restaurant_name: data.restaurant_name,
                location: db.raw(`ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography`, [longitude, latitude]),
            })
                .returning([
                "restaurant_name",
                db.raw("ST_Y(location::geometry) as latitude"),
                db.raw("ST_X(location::geometry) as longitude"),
            ]);
            return restaurant;
        });
    }
    getRestaurants() {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurants = yield db("restaurants")
                .select("restaurant_id", "restaurant_name", db.raw("ST_Y(location::geometry) as latitude"), db.raw("ST_X(location::geometry) as longitude"))
                .orderBy("restaurant_name", "asc");
            return restaurants;
        });
    }
    getRestaurantByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurant = yield db("restaurants")
                .select("restaurant_id", "restaurant_name", db.raw("ST_Y(location::geometry) as latitude"), db.raw("ST_X(location::geometry) as longitude"))
                .where({
                restaurant_name: name,
            })
                .first();
            return restaurant;
        });
    }
    updateRestaurant(restaurant_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updates = {};
            if (data.restaurant_name)
                updates.restaurant_name = data.restaurant_name;
            const hasLat = data.latitude !== undefined;
            const hasLng = data.longitude !== undefined;
            if (hasLat || hasLng) {
                const existing = yield db("restaurants")
                    .where({ restaurant_id })
                    .select(db.raw("ST_Y(location::geometry) as latitude"), db.raw("ST_X(location::geometry) as longitude"))
                    .first();
                const latitude = hasLat ? data.latitude : existing.latitude;
                const longitude = hasLng ? data.longitude : existing.longitude;
                updates.location = db.raw(`ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography`, [longitude, latitude]);
            }
            const [updated] = yield db("restaurants")
                .where({ restaurant_id: restaurant_id })
                .update(updates)
                .returning([
                "restaurant_name",
                db.raw("ST_Y(location::geometry) as latitude"),
                db.raw("ST_X(location::geometry) as longitude"),
            ]);
            return updated;
        });
    }
    getRestaurantsByProximity(latitude, longitude, radius) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurants = yield db("restaurants")
                .select("restaurant_id", "restaurant_name", db.raw("ST_Y(location::geometry) as latitude"), db.raw("ST_X(location::geometry) as longitude"))
                .whereRaw(`ST_DWithin(location, ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography, ?)`, [longitude, latitude, radius]);
            return restaurants;
        });
    }
    ;
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurant = yield db("restaurants")
                .select("restaurant_id", "restaurant_name", db.raw("ST_Y(location::geometry) as latitude"), db.raw("ST_X(location::geometry) as longitude"))
                .whereIn('restaurant_id', id);
            return restaurant;
        });
    }
}
const restaurantDao = new Restaurant();
export default restaurantDao;
