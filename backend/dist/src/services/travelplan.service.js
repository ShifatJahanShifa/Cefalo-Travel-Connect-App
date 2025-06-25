var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TravelPlanResponseDTO } from "../DTOs/travelplan.dto.js";
import travelPlanDao from "../repositories/dao/travelplan.dao.js";
import accommodationDao from "../repositories/dao/accommodation.dao.js";
import travelPlanAccommodationDao from "../repositories/dao/travelplan_accommodation.dao.js";
import transportDao from "../repositories/dao/transport.dao.js";
import travelPlanTransportDao from "../repositories/dao/travelplan_transport.dao.js";
import placeDao from "../repositories/dao/place.dao.js";
import travelPlanPlaceDao from "../repositories/dao/travelplan_place.dao.js";
import { AppError } from "../utils/appError.js";
import travelPlanMemberdao from "../repositories/dao/travelplanmember.dao.js";
export const craeteTravelPlan = (input) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    // first e core table, then services table 
    const createdPlan = yield travelPlanDao.craeteTravelPlan(input);
    const travel_plan_id = createdPlan.travel_plan_id;
    const creator_id = createdPlan.planner_id;
    if ((_a = input.accommodations) === null || _a === void 0 ? void 0 : _a.length) {
        // at first search in accommodations table
        for (let index = 0; index < ((_b = input.accommodations) === null || _b === void 0 ? void 0 : _b.length); index++) {
            const accommodationRecord = yield accommodationDao.getAccommodationByTypeAndName(input.accommodations[index].accommodation_type, input.accommodations[index].accommodation_name);
            if (accommodationRecord) {
                yield travelPlanAccommodationDao.createTravelPlanAccommodation(travel_plan_id, accommodationRecord.accommodation_id);
            }
            else {
                // nothing
                // create  
                const data = {
                    accommodation_name: input.accommodations[index].accommodation_name,
                    accommodation_type: input.accommodations[index].accommodation_type,
                    latitude: input.accommodations[index].latitude,
                    longitude: input.accommodations[index].longitude
                };
                const accommodation = yield accommodationDao.createAccommodation(data);
                yield travelPlanAccommodationDao.createTravelPlanAccommodation(travel_plan_id, accommodation.accommodation_id);
            }
        }
    }
    if ((_c = input.transports) === null || _c === void 0 ? void 0 : _c.length) {
        for (let index = 0; index < ((_d = input.transports) === null || _d === void 0 ? void 0 : _d.length); index++) {
            const transportRecord = yield transportDao.getTransportByTypeAndName(input.transports[index].transport_type, input.transports[index].transport_name);
            if (transportRecord) {
                yield travelPlanTransportDao.createTravelPlanTransport(travel_plan_id, transportRecord.transport_id);
            }
            else {
                // nothing
                const data = {
                    transport_type: input.transports[index].transport_type,
                    transport_name: input.transports[index].transport_name,
                };
                const transport = yield transportDao.createTransport(data);
                yield travelPlanTransportDao.createTravelPlanTransport(travel_plan_id, transport.transport_id
                // input.transports[index].cost,
                // input.transports[index].rating,
                // input.transports[index].review,
                );
            }
        }
    }
    if ((_e = input.places) === null || _e === void 0 ? void 0 : _e.length) {
        for (let index = 0; index < ((_f = input.places) === null || _f === void 0 ? void 0 : _f.length); index++) {
            const placeRecord = yield placeDao.getPlaceByName(input.places[index].place_name);
            if (placeRecord) {
                yield travelPlanPlaceDao.createTravelPlanPlace(travel_plan_id, placeRecord.place_id);
            }
            else {
                // nothing
                const data = {
                    place_name: input.places[index].place_name,
                    latitude: input.places[index].latitude,
                    longitude: input.places[index].longitude
                };
                const place = yield placeDao.createPlace(data);
                yield travelPlanPlaceDao.createTravelPlanPlace(travel_plan_id, place.place_id
                // input.places[index].cost,
                // input.places[index].rating,
                // input.places[index].review,
                );
            }
        }
    }
    // now creating creator user in the travel plan member table
    const data = {
        travel_plan_id: travel_plan_id,
        user_id: creator_id,
        role: "creator"
    };
    const result = yield travelPlanMemberdao.addTravelPlanMember(data);
    if (!result) {
        throw new AppError("failed to add creator of the travel plan", 500);
    }
    return "travel plan created";
});
export const getTravelPlans = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = (page - 1) * limit;
    const travelPlans = yield travelPlanDao.getTravelPlans(page, limit);
    const enrichedTravelPlans = yield Promise.all(travelPlans.map((travelPlan) => __awaiter(void 0, void 0, void 0, function* () {
        const travel_plan_id = travelPlan.travel_plan_id;
        const [travelPlanTransports, travelPlanPlaces, travelPlanAccommodations,] = yield Promise.all([
            travelPlanTransportDao.getById(travel_plan_id),
            travelPlanPlaceDao.getById(travel_plan_id),
            travelPlanAccommodationDao.getById(travel_plan_id),
        ]);
        const transportIds = travelPlanTransports.map((t) => t.transport_id).filter(Boolean);
        const placeIds = travelPlanPlaces.map((p) => p.place_id).filter(Boolean);
        const accommodationIds = travelPlanAccommodations.map(a => a.accommodation_id).filter(Boolean);
        const [transportsData, placesData, accommodationsData] = yield Promise.all([
            transportIds.length ? transportDao.getById(transportIds) : [],
            placeIds.length ? placeDao.getById(placeIds) : [],
            accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
        ]);
        const transports = travelPlanTransports.map((TravelPlanItem) => {
            const core = transportsData.find(t => t.transport_id === TravelPlanItem.transport_id);
            return Object.assign(Object.assign({}, (core !== null && core !== void 0 ? core : {})), TravelPlanItem);
        });
        const places = travelPlanPlaces.map((TravelPlanItem) => {
            const core = placesData.find(p => p.place_id === TravelPlanItem.place_id);
            return Object.assign(Object.assign({}, (core !== null && core !== void 0 ? core : {})), TravelPlanItem);
        });
        const accommodations = travelPlanAccommodations.map(TravelPlanItem => {
            const core = accommodationsData.find(a => a.accommodation_id === TravelPlanItem.accommodation_id);
            return Object.assign(Object.assign({}, (core !== null && core !== void 0 ? core : {})), TravelPlanItem);
        });
        return Object.assign(Object.assign({}, travelPlan), { transports,
            places,
            accommodations });
    })));
    return enrichedTravelPlans.map((TravelPlan) => new TravelPlanResponseDTO(TravelPlan));
});
export const getTravelPlanById = (travel_plan_id) => __awaiter(void 0, void 0, void 0, function* () {
    const travelPlan = yield travelPlanDao.getTravelPlanById(travel_plan_id);
    if (!travelPlan) {
        throw new AppError('post not found', 404);
    }
    const [travelPlanTransports, travelPlanPlaces, travelPlanAccommodations,] = yield Promise.all([
        travelPlanTransportDao.getById(travel_plan_id),
        travelPlanPlaceDao.getById(travel_plan_id),
        travelPlanAccommodationDao.getById(travel_plan_id),
    ]);
    const transportIds = travelPlanTransports.map((t) => t.transport_id).filter(Boolean);
    const placeIds = travelPlanPlaces.map((p) => p.place_id).filter(Boolean);
    const accommodationIds = travelPlanAccommodations.map(a => a.accommodation_id).filter(Boolean);
    const [transportsData, placesData, accommodationsData] = yield Promise.all([
        transportIds.length ? transportDao.getById(transportIds) : [],
        placeIds.length ? placeDao.getById(placeIds) : [],
        accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
    ]);
    const transports = travelPlanTransports.map((TravelPlanItem) => {
        const core = transportsData.find(t => t.transport_id === TravelPlanItem.transport_id);
        return Object.assign(Object.assign({}, (core !== null && core !== void 0 ? core : {})), TravelPlanItem);
    });
    const places = travelPlanPlaces.map((TravelPlanItem) => {
        const core = placesData.find(p => p.place_id === TravelPlanItem.place_id);
        return Object.assign(Object.assign({}, (core !== null && core !== void 0 ? core : {})), TravelPlanItem);
    });
    const accommodations = travelPlanAccommodations.map(TravelPlanItem => {
        const core = accommodationsData.find(a => a.accommodation_id === TravelPlanItem.accommodation_id);
        return Object.assign(Object.assign({}, (core !== null && core !== void 0 ? core : {})), TravelPlanItem);
    });
    const enrichedTravelPlan = Object.assign(Object.assign({}, travelPlan), { transports,
        places,
        accommodations });
    return new TravelPlanResponseDTO(enrichedTravelPlan);
});
export const updateTravelPlan = (travel_plan_id, input) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const existingTravelPlan = yield travelPlanDao.updateTravelPlanById(travel_plan_id, input);
    if (!existingTravelPlan) {
        throw new AppError("travel not found", 404);
    }
    if ((_a = input.accommodations) === null || _a === void 0 ? void 0 : _a.length) {
        for (const acc of input.accommodations) {
            const accommodationRecord = yield accommodationDao.getAccommodationByTypeAndName(acc.accommodation_type, acc.accommodation_name);
            if (accommodationRecord) {
                yield travelPlanAccommodationDao.updateTravelPlanAccommodation(travel_plan_id, accommodationRecord.accommodation_id);
            }
        }
    }
    if ((_b = input.transports) === null || _b === void 0 ? void 0 : _b.length) {
        for (const tr of input.transports) {
            const transportRecord = yield transportDao.getTransportByTypeAndName(tr.transport_type, tr.transport_name);
            if (transportRecord) {
                yield travelPlanTransportDao.updateTravelPlanTransport(travel_plan_id, transportRecord.transport_id);
            }
        }
    }
    if ((_c = input.places) === null || _c === void 0 ? void 0 : _c.length) {
        for (const pl of input.places) {
            const placeRecord = yield placeDao.getPlaceByName(pl.place_name);
            if (placeRecord) {
                yield travelPlanPlaceDao.updateTravelPlanPlace(travel_plan_id, placeRecord.place_id);
            }
        }
    }
    return "Post updated successfully";
});
export const deleteTravelPlan = (travel_plan_id) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield travelPlanDao.deleteTravelPlanById(travel_plan_id);
    return status;
});
export const getTravelPlansByMemberId = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const travelPlans = yield travelPlanDao.getTravelPlanByMemberId(user_id);
    const enrichedTravelPlans = yield Promise.all(travelPlans.map((travelPlan) => __awaiter(void 0, void 0, void 0, function* () {
        const travel_plan_id = travelPlan.travel_plan_id;
        const [travelPlanTransports, travelPlanPlaces, travelPlanAccommodations,] = yield Promise.all([
            travelPlanTransportDao.getById(travel_plan_id),
            travelPlanPlaceDao.getById(travel_plan_id),
            travelPlanAccommodationDao.getById(travel_plan_id),
        ]);
        const transportIds = travelPlanTransports.map((t) => t.transport_id).filter(Boolean);
        const placeIds = travelPlanPlaces.map((p) => p.place_id).filter(Boolean);
        const accommodationIds = travelPlanAccommodations.map(a => a.accommodation_id).filter(Boolean);
        const [transportsData, placesData, accommodationsData] = yield Promise.all([
            transportIds.length ? transportDao.getById(transportIds) : [],
            placeIds.length ? placeDao.getById(placeIds) : [],
            accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
        ]);
        const transports = travelPlanTransports.map((TravelPlanItem) => {
            const core = transportsData.find(t => t.transport_id === TravelPlanItem.transport_id);
            return Object.assign(Object.assign({}, (core !== null && core !== void 0 ? core : {})), TravelPlanItem);
        });
        const places = travelPlanPlaces.map((TravelPlanItem) => {
            const core = placesData.find(p => p.place_id === TravelPlanItem.place_id);
            return Object.assign(Object.assign({}, (core !== null && core !== void 0 ? core : {})), TravelPlanItem);
        });
        const accommodations = travelPlanAccommodations.map(TravelPlanItem => {
            const core = accommodationsData.find(a => a.accommodation_id === TravelPlanItem.accommodation_id);
            return Object.assign(Object.assign({}, (core !== null && core !== void 0 ? core : {})), TravelPlanItem);
        });
        return Object.assign(Object.assign({}, travelPlan), { transports,
            places,
            accommodations });
    })));
    return enrichedTravelPlans.map((TravelPlan) => new TravelPlanResponseDTO(TravelPlan));
});
