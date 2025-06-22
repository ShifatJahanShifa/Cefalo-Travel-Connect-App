export class restaurantDTO {
    constructor(restaurant) {
        this.restaurant_id = restaurant.restaurant_id;
        this.restaurant_name = restaurant.restaurant_name;
        this.popular_food = restaurant.popular_food;
        this.location = {
            latitude: restaurant.latitude,
            longitude: restaurant.longitude
        };
    }
}
