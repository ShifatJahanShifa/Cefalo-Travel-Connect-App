import { placeCreation, getPlace } from "../../src/types/place.type.ts"; 

export const mockPlace: getPlace = {
    place_id: 'place-123',
    place_name: 'place 1',
    latitude: 21.9802,
    longitude: 90.1267
}

export const mockUpdatedPlace: getPlace = {
    place_id: 'place-123',
    place_name: 'place 1',
    latitude: 20.9802,
    longitude: 91.1267
}