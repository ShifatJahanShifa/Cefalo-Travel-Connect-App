import { getRestaurant, restaurantCreation } from "../../src/types/restaurant.type.ts";

export const mockRestaurant: getRestaurant = {
    restaurant_id: 'restaurant-123',
    restaurant_name: 'restaurant 1',
    latitude: 21.9802,
    longitude: 90.1267
}

export const mockUpdatedRestaurant: getRestaurant = {
    restaurant_id: 'restaurant-123',
    restaurant_name: 'restaurant 1',
    latitude: 20.9802,
    longitude: 91.1267
}