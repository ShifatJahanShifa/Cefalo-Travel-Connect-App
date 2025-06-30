import { TravelPlanResponseDTO } from "../DTOs/travelplan.dto.js";
import travelPlanDao from "../repositories/dao/travelplan.repository.js";
import accommodationDao from "../repositories/dao/accommodation.repository.js";
import travelPlanAccommodationDao from "../repositories/dao/travelplan_accommodation.repository.js";
import transportDao from "../repositories/dao/transport.repository.js";
import travelPlanTransportDao from "../repositories/dao/travelplan_transport.repository.js";
import placeDao from "../repositories/dao/place.repository.js";
import travelPlanPlaceDao from "../repositories/dao/travelplan_place.repository.js";
import { AppError } from "../utils/appError.js";
import travelPlanMemberdao from "../repositories/dao/travelplanmember.repository.js";
export const craeteTravelPlan = async (input) => {
    // first e core table, then services table 
    const createdPlan = await travelPlanDao.craeteTravelPlan(input);
    const travel_plan_id = createdPlan.travel_plan_id;
    const creator_id = createdPlan.planner_id;
    if (input.accommodations?.length) {
        // at first search in accommodations table
        for (let index = 0; index < input.accommodations?.length; index++) {
            const accommodationRecord = await accommodationDao.getAccommodationByTypeAndName(input.accommodations[index].accommodation_type, input.accommodations[index].accommodation_name);
            if (accommodationRecord) {
                await travelPlanAccommodationDao.createTravelPlanAccommodation(travel_plan_id, accommodationRecord.accommodation_id);
            }
            else {
                const data = {
                    accommodation_name: input.accommodations[index].accommodation_name,
                    accommodation_type: input.accommodations[index].accommodation_type,
                    latitude: input.accommodations[index].latitude,
                    longitude: input.accommodations[index].longitude
                };
                const accommodation = await accommodationDao.createAccommodation(data);
                await travelPlanAccommodationDao.createTravelPlanAccommodation(travel_plan_id, accommodation.accommodation_id);
            }
        }
    }
    if (input.transports?.length) {
        for (let index = 0; index < input.transports?.length; index++) {
            const transportRecord = await transportDao.getTransportByTypeAndName(input.transports[index].transport_type, input.transports[index].transport_name);
            if (transportRecord) {
                await travelPlanTransportDao.createTravelPlanTransport(travel_plan_id, transportRecord.transport_id);
            }
            else {
                const data = {
                    transport_type: input.transports[index].transport_type,
                    transport_name: input.transports[index].transport_name,
                };
                const transport = await transportDao.createTransport(data);
                await travelPlanTransportDao.createTravelPlanTransport(travel_plan_id, transport.transport_id);
            }
        }
    }
    if (input.places?.length) {
        for (let index = 0; index < input.places?.length; index++) {
            const placeRecord = await placeDao.getPlaceByName(input.places[index].place_name);
            if (placeRecord) {
                await travelPlanPlaceDao.createTravelPlanPlace(travel_plan_id, placeRecord.place_id);
            }
            else {
                const data = {
                    place_name: input.places[index].place_name,
                    latitude: input.places[index].latitude,
                    longitude: input.places[index].longitude
                };
                const place = await placeDao.createPlace(data);
                await travelPlanPlaceDao.createTravelPlanPlace(travel_plan_id, place.place_id);
            }
        }
    }
    // now creating creator user in the travel plan member table
    const data = {
        travel_plan_id: travel_plan_id,
        user_id: creator_id,
        role: "creator"
    };
    const result = await travelPlanMemberdao.addTravelPlanMember(data);
    if (!result) {
        throw new AppError("failed to add creator of the travel plan", 500);
    }
    return "travel plan created";
};
export const getTravelPlans = async (page, limit) => {
    const offset = (page - 1) * limit;
    const travelPlans = await travelPlanDao.getTravelPlans(page, limit);
    const enrichedTravelPlans = await Promise.all(travelPlans.map(async (travelPlan) => {
        const travel_plan_id = travelPlan.travel_plan_id;
        const [travelPlanTransports, travelPlanPlaces, travelPlanAccommodations,] = await Promise.all([
            travelPlanTransportDao.getById(travel_plan_id),
            travelPlanPlaceDao.getById(travel_plan_id),
            travelPlanAccommodationDao.getById(travel_plan_id),
        ]);
        const transportIds = travelPlanTransports.map((t) => t.transport_id).filter(Boolean);
        const placeIds = travelPlanPlaces.map((p) => p.place_id).filter(Boolean);
        const accommodationIds = travelPlanAccommodations.map(a => a.accommodation_id).filter(Boolean);
        const [transportsData, placesData, accommodationsData] = await Promise.all([
            transportIds.length ? transportDao.getById(transportIds) : [],
            placeIds.length ? placeDao.getById(placeIds) : [],
            accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
        ]);
        const transports = travelPlanTransports.map((TravelPlanItem) => {
            const core = transportsData.find(t => t.transport_id === TravelPlanItem.transport_id);
            return { ...(core ?? {}), ...TravelPlanItem };
        });
        const places = travelPlanPlaces.map((TravelPlanItem) => {
            const core = placesData.find(p => p.place_id === TravelPlanItem.place_id);
            return { ...(core ?? {}), ...TravelPlanItem };
        });
        const accommodations = travelPlanAccommodations.map(TravelPlanItem => {
            const core = accommodationsData.find(a => a.accommodation_id === TravelPlanItem.accommodation_id);
            return { ...(core ?? {}), ...TravelPlanItem };
        });
        return {
            ...travelPlan,
            transports,
            places,
            accommodations
        };
    }));
    return enrichedTravelPlans.map((TravelPlan) => new TravelPlanResponseDTO(TravelPlan));
};
export const getTravelPlanById = async (travel_plan_id) => {
    const travelPlan = await travelPlanDao.getTravelPlanById(travel_plan_id);
    if (!travelPlan) {
        throw new AppError('travel plan not found', 404);
    }
    const [travelPlanTransports, travelPlanPlaces, travelPlanAccommodations,] = await Promise.all([
        travelPlanTransportDao.getById(travel_plan_id),
        travelPlanPlaceDao.getById(travel_plan_id),
        travelPlanAccommodationDao.getById(travel_plan_id),
    ]);
    const transportIds = travelPlanTransports.map((t) => t.transport_id).filter(Boolean);
    const placeIds = travelPlanPlaces.map((p) => p.place_id).filter(Boolean);
    const accommodationIds = travelPlanAccommodations.map(a => a.accommodation_id).filter(Boolean);
    const [transportsData, placesData, accommodationsData] = await Promise.all([
        transportIds.length ? transportDao.getById(transportIds) : [],
        placeIds.length ? placeDao.getById(placeIds) : [],
        accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
    ]);
    const transports = travelPlanTransports.map((TravelPlanItem) => {
        const core = transportsData.find(t => t.transport_id === TravelPlanItem.transport_id);
        return { ...(core ?? {}), ...TravelPlanItem };
    });
    const places = travelPlanPlaces.map((TravelPlanItem) => {
        const core = placesData.find(p => p.place_id === TravelPlanItem.place_id);
        return { ...(core ?? {}), ...TravelPlanItem };
    });
    const accommodations = travelPlanAccommodations.map(TravelPlanItem => {
        const core = accommodationsData.find(a => a.accommodation_id === TravelPlanItem.accommodation_id);
        return { ...(core ?? {}), ...TravelPlanItem };
    });
    const enrichedTravelPlan = {
        ...travelPlan,
        transports,
        places,
        accommodations
    };
    return new TravelPlanResponseDTO(enrichedTravelPlan);
};
export const updateTravelPlan = async (travel_plan_id, input) => {
    const travelPlan = await travelPlanDao.getTravelPlanById(travel_plan_id);
    if (travelPlan) {
        throw new AppError("travel not found", 404);
    }
    // will add authorization later
    const isExist = await travelPlanMemberdao.memberExists(input.planner_id, travel_plan_id);
    if (isExist && isExist.role === "member") {
        throw new AppError("you are not allowed to update the travelplan", 403);
    }
    const existingTravelPlan = await travelPlanDao.updateTravelPlanById(travel_plan_id, input);
    if (input.accommodations?.length) {
        for (const acc of input.accommodations) {
            const accommodationRecord = await accommodationDao.getAccommodationByTypeAndName(acc.accommodation_type, acc.accommodation_name);
            if (accommodationRecord) {
                await travelPlanAccommodationDao.updateTravelPlanAccommodation(travel_plan_id, accommodationRecord.accommodation_id);
            }
        }
    }
    if (input.transports?.length) {
        for (const tr of input.transports) {
            const transportRecord = await transportDao.getTransportByTypeAndName(tr.transport_type, tr.transport_name);
            if (transportRecord) {
                await travelPlanTransportDao.updateTravelPlanTransport(travel_plan_id, transportRecord.transport_id);
            }
        }
    }
    if (input.places?.length) {
        for (const pl of input.places) {
            const placeRecord = await placeDao.getPlaceByName(pl.place_name);
            if (placeRecord) {
                await travelPlanPlaceDao.updateTravelPlanPlace(travel_plan_id, placeRecord.place_id);
            }
        }
    }
    return "travel plan updated successfully";
};
export const deleteTravelPlan = async (travel_plan_id, user_id) => {
    const travelPlan = await travelPlanDao.getTravelPlanById(travel_plan_id);
    if (travelPlan) {
        throw new AppError("travel plan not found", 404);
    }
    const isExist = await travelPlanMemberdao.memberExists(user_id, travel_plan_id);
    if (isExist && isExist.role !== "creator") {
        throw new AppError("you are not allowed to delete the travelplan", 403);
    }
    const status = await travelPlanDao.deleteTravelPlanById(travel_plan_id);
    return status;
};
export const getTravelPlansByMemberId = async (user_id) => {
    const travelPlans = await travelPlanDao.getTravelPlanByMemberId(user_id);
    const enrichedTravelPlans = await Promise.all(travelPlans.map(async (travelPlan) => {
        const travel_plan_id = travelPlan.travel_plan_id;
        const [travelPlanTransports, travelPlanPlaces, travelPlanAccommodations,] = await Promise.all([
            travelPlanTransportDao.getById(travel_plan_id),
            travelPlanPlaceDao.getById(travel_plan_id),
            travelPlanAccommodationDao.getById(travel_plan_id),
        ]);
        const transportIds = travelPlanTransports.map((t) => t.transport_id).filter(Boolean);
        const placeIds = travelPlanPlaces.map((p) => p.place_id).filter(Boolean);
        const accommodationIds = travelPlanAccommodations.map(a => a.accommodation_id).filter(Boolean);
        const [transportsData, placesData, accommodationsData] = await Promise.all([
            transportIds.length ? transportDao.getById(transportIds) : [],
            placeIds.length ? placeDao.getById(placeIds) : [],
            accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
        ]);
        const transports = travelPlanTransports.map((TravelPlanItem) => {
            const core = transportsData.find(t => t.transport_id === TravelPlanItem.transport_id);
            return { ...(core ?? {}), ...TravelPlanItem };
        });
        const places = travelPlanPlaces.map((TravelPlanItem) => {
            const core = placesData.find(p => p.place_id === TravelPlanItem.place_id);
            return { ...(core ?? {}), ...TravelPlanItem };
        });
        const accommodations = travelPlanAccommodations.map(TravelPlanItem => {
            const core = accommodationsData.find(a => a.accommodation_id === TravelPlanItem.accommodation_id);
            return { ...(core ?? {}), ...TravelPlanItem };
        });
        return {
            ...travelPlan,
            transports,
            places,
            accommodations
        };
    }));
    return enrichedTravelPlans.map((TravelPlan) => new TravelPlanResponseDTO(TravelPlan));
};
