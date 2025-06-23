export class AccommodationDTO {
    constructor(accommodation) {
        this.accommodation_id = accommodation.accommodation_id;
        this.accommodation_type = accommodation.accommodation_type;
        this.accommodation_name = accommodation.accommodation_name;
        this.location = {
            latitude: accommodation.latitude,
            longitude: accommodation.longitude
        };
    }
}
