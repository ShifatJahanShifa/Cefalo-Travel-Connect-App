import { restaurantCreation, getRestaurant, restaurantUpdation } from "../../types/restaurant.type.ts";
import { IRestaurant } from "../interfaces/restaurant.interface.ts";
import { Knex } from "knex";
import { dbClient } from "../../db/db.ts";
import { AppError } from "../../utils/appError.ts";
const db: Knex = dbClient.getConnection();

class Restaurant implements IRestaurant {
    async createRestaurant(data: restaurantCreation): Promise<restaurantCreation> {

        const { latitude, longitude } = data;

        const [restaurant] = await db("restaurants")
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
    }

    async getRestaurants(): Promise<getRestaurant[]> {
        const restaurants: getRestaurant[] = await db("restaurants")
        .select(
            "restaurant_id",
            "restaurant_name",
            db.raw("ST_Y(location::geometry) as latitude"),
            db.raw("ST_X(location::geometry) as longitude")
        )
        .orderBy("restaurant_name", "asc");

        return restaurants;
        
    }

    async getRestaurantByName(name: string): Promise<getRestaurant> {
        
        const restaurant = await db("restaurants")
        .select(
            "restaurant_id",
            "restaurant_name",
            db.raw("ST_Y(location::geometry) as latitude"),
            db.raw("ST_X(location::geometry) as longitude")
        )
        .where({
            restaurant_name: name,
        })
        .first();

        return restaurant;
       
    }

    async updateRestaurant(restaurant_id: string, data: restaurantUpdation): Promise<restaurantCreation> {
        
        const updates: Record<string, any> = {};

        if (data.restaurant_name) updates.restaurant_name = data.restaurant_name;
      

        const hasLat = data.latitude !== undefined;
        const hasLng = data.longitude !== undefined;

        if (hasLat || hasLng) {
            const existing = await db("restaurants")
                .where({ restaurant_id })
                .select(
                db.raw("ST_Y(location::geometry) as latitude"),
                db.raw("ST_X(location::geometry) as longitude")
                )
                .first();

            const latitude = hasLat ? data.latitude : existing.latitude;
            const longitude = hasLng ? data.longitude : existing.longitude;

            updates.location = db.raw(`ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography`, [longitude, latitude]);
        }

        const [updated] = await db("restaurants")
        .where({ restaurant_id: restaurant_id })
        .update(updates)
        .returning([
            "restaurant_name",
            db.raw("ST_Y(location::geometry) as latitude"),
            db.raw("ST_X(location::geometry) as longitude"),
        ]);

        return updated;
        
    }

    async getRestaurantsByProximity(latitude: number, longitude: number, radius: number): Promise<getRestaurant[]> {

        const restaurants: getRestaurant[] = await db("restaurants")
        .select(
            "restaurant_id",
            "restaurant_name",
            db.raw("ST_Y(location::geometry) as latitude"),
            db.raw("ST_X(location::geometry) as longitude")
        )
        .whereRaw(
            `ST_DWithin(location, ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography, ?)`,
            [longitude, latitude, radius]
        );

        return restaurants;
    };


    async getById(id: number[]): Promise<getRestaurant[]> {
        const restaurant = await db("restaurants")
        .select(
            "restaurant_id",
            "restaurant_name",
            db.raw("ST_Y(location::geometry) as latitude"),
            db.raw("ST_X(location::geometry) as longitude")
        )
        .whereIn(
            'restaurant_id', id
        );
        

        return restaurant;
    }
}

const restaurantDao: Restaurant = new Restaurant();
export default restaurantDao;