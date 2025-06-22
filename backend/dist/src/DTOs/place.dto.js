export class placeDTO {
    constructor(place) {
        this.place_id = place.place_id;
        this.place_name = place.place_name;
        this.location = {
            latitude: place.latitude,
            longitude: place.longitude
        };
    }
}
