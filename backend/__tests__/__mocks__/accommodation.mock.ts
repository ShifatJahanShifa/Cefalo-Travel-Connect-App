import { getAccommodation } from "../../src/types/accommodation.type.ts";

export const mockAccommodation: getAccommodation = {
    accommodation_id: 'acc-123',
    accommodation_type: 'hotel',
    accommodation_name: 'Test Hotel',
    latitude: 23.8103,
    longitude: 90.4125
};

export const mockUpdatedAccommodation: getAccommodation = {
    accommodation_id: 'acc-123',
    accommodation_type: 'hotel',
    accommodation_name: 'Updated Hotel',
    latitude: 23.8103,
    longitude: 90.4125
};