import { AccommodationDTO } from "../../src/DTOs/accommodation.dto.ts";

export const mockAccommodationDTO: AccommodationDTO = {
  accommodation_id: 'acc123',
  accommodation_name: 'Hotel Sunshine',
  accommodation_type: 'hotel',
  location: {
    latitude: 23.8103,
    longitude: 90.4125
  }
};
