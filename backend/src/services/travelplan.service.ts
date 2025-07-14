import { TravelPlanResponseDTO } from "../DTOs/travelplan.dto.ts";
import travelPlanDao from "../repositories/dao/travelplan.repository.ts";
import { travelPlanInput, travelPlanMember, travelPlanMemberAdd, travelPlanOutput } from "../types/travelplan.type.ts";
import accommodationDao from "../repositories/dao/accommodation.repository.ts";
import travelPlanAccommodationDao from "../repositories/dao/travelplan_accommodation.repository.ts";
import transportDao from "../repositories/dao/transport.repository.ts";
import travelPlanTransportDao from "../repositories/dao/travelplan_transport.repository.ts";
import placeDao from "../repositories/dao/place.repository.ts";
import travelPlanPlaceDao from "../repositories/dao/travelplan_place.repository.ts";
import { AppError } from "../utils/appError.ts";
import { accommodationCreation, getAccommodation } from "../types/accommodation.type.ts";
import { getTransport, transportCreation } from "../types/transport.type.ts";
import { getPlace, placeCreation } from "../types/place.type.ts";
import travelPlanMemberdao from "../repositories/dao/travelplanmember.repository.ts";
import { HTTP_STATUS } from "../constants/httpStatus.ts";




export const craeteTravelPlan = async(input: travelPlanInput): Promise<string> => {
    const createdPlan: any = await travelPlanDao.craeteTravelPlan(input);
    
    const travel_plan_id = createdPlan.travel_plan_id;
    const creator_id: string = createdPlan.planner_id;

    if(input.accommodations?.length) 
    {
    // at first search in accommodations table

        for (let index=0; index<input.accommodations?.length;index++) {
            const accommodationRecord = await accommodationDao.getAccommodationByTypeAndName(input.accommodations[index].accommodation_type,
                input.accommodations[index].accommodation_name
            );

            if (accommodationRecord) 
            {
                await travelPlanAccommodationDao.createTravelPlanAccommodation(
                    travel_plan_id,
                    accommodationRecord.accommodation_id
                );
            } 
            else 
            {
                const data: accommodationCreation = {
                    accommodation_name : input.accommodations[index].accommodation_name,
                    accommodation_type : input.accommodations[index].accommodation_type,
                    latitude : input.accommodations[index].latitude,
                    longitude : input.accommodations[index].longitude 
                };
                const accommodation: getAccommodation = await accommodationDao.createAccommodation(data); 

                await travelPlanAccommodationDao.createTravelPlanAccommodation(
                    travel_plan_id,
                    accommodation.accommodation_id,
                    
                );
                
            }
        }
    }

    if(input.transports?.length) {
        for (let index=0; index<input.transports?.length;index++) {
            const transportRecord = await transportDao.getTransportByTypeAndName(input.transports[index].transport_type,
                input.transports[index].transport_name
            );

            if (transportRecord) {
                await travelPlanTransportDao.createTravelPlanTransport(
                    travel_plan_id,
                    transportRecord.transport_id
                );
            } 
            else 
            {   
                const data: transportCreation = {
                    transport_type : input.transports[index].transport_type,
                    transport_name : input.transports[index].transport_name,  
                };
                const transport: getTransport = await transportDao.createTransport(data);

                await travelPlanTransportDao.createTravelPlanTransport(
                    travel_plan_id,
                    transport.transport_id
            
                );
            }
        }   
    }
    
    if(input.places?.length) 
    {
        for (let index=0; index<input.places?.length;index++) {
            const placeRecord = await placeDao.getPlaceByName(input.places[index].place_name);

            if (placeRecord) {
                await travelPlanPlaceDao.createTravelPlanPlace(
                    travel_plan_id,
                    placeRecord.place_id,
               
                );
            } 
            else 
            {
                const data: placeCreation = {
                    place_name : input.places[index].place_name,
                
                    latitude : input.places[index].latitude,
                    longitude : input.places[index].longitude 
                };
                const place: getPlace = await placeDao.createPlace(data) ;

                await travelPlanPlaceDao.createTravelPlanPlace(
                    travel_plan_id,
                    place.place_id
                    
                );
            }
        }
    }

    // now creating creator user in the travel plan member table
    const data: travelPlanMemberAdd = {
        travel_plan_id: travel_plan_id,
        user_id: creator_id,
        role: "creator"
    };
    const result: travelPlanMember = await travelPlanMemberdao.addTravelPlanMember(data);

    if(!result) 
    {
        throw new AppError("failed to add creator of the travel plan", HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

    return "travel plan created";
} 


export const getTravelPlans = async(page: number, limit: number): Promise<TravelPlanResponseDTO[]> => {
    const offset = (page - 1) * limit;

    const travelPlans = await travelPlanDao.getTravelPlans(page, limit); 

    const enrichedTravelPlans: travelPlanOutput[] = await Promise.all(
            travelPlans.map(async (travelPlan) => {
            const travel_plan_id = travelPlan.travel_plan_id
        
            const [
                travelPlanTransports,
                travelPlanPlaces,
                travelPlanAccommodations,
                
            ] = await Promise.all([
                travelPlanTransportDao.getById(travel_plan_id),
                travelPlanPlaceDao.getById(travel_plan_id),
                travelPlanAccommodationDao.getById(travel_plan_id),
                
            ]);

        
            const transportIds = travelPlanTransports.map((t: any) => t.transport_id).filter(Boolean);
            const placeIds = travelPlanPlaces.map((p: any) => p.place_id).filter(Boolean);
            const accommodationIds = travelPlanAccommodations.map(a => a.accommodation_id).filter(Boolean);

            
            const [
                transportsData,
                placesData,
                accommodationsData
               
            ] = await Promise.all([
                transportIds.length ? transportDao.getById(transportIds) : [],
                placeIds.length ? placeDao.getById(placeIds) : [],
                accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
        
            ]);

        
            const transports = travelPlanTransports.map((TravelPlanItem: any) => {
                const core = transportsData.find(t => t.transport_id === TravelPlanItem.transport_id);
                return { ...(core ?? {}), ...TravelPlanItem };
            });

            const places = travelPlanPlaces.map((TravelPlanItem: any) => {
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
            })
        );

    return enrichedTravelPlans.map((TravelPlan) => new TravelPlanResponseDTO(TravelPlan));   
}


export const getTravelPlanById = async(travel_plan_id: string): Promise<TravelPlanResponseDTO> => {
    const travelPlan= await travelPlanDao.getTravelPlanById(travel_plan_id);
   
    if(!travelPlan) 
    {
        throw new AppError('travel plan not found', HTTP_STATUS.NOT_FOUND)
    }
        
    const [
        travelPlanTransports,
        travelPlanPlaces,
        travelPlanAccommodations,
        
    ] = await Promise.all([
        travelPlanTransportDao.getById(travel_plan_id),
        travelPlanPlaceDao.getById(travel_plan_id),
        travelPlanAccommodationDao.getById(travel_plan_id),
        
    ]);


    const transportIds = travelPlanTransports.map((t: any) => t.transport_id).filter(Boolean);
    const placeIds = travelPlanPlaces.map((p: any) => p.place_id).filter(Boolean);
    const accommodationIds = travelPlanAccommodations.map(a => a.accommodation_id).filter(Boolean);

    
    const [
        transportsData,
        placesData,
        accommodationsData
        
    ] = await Promise.all([
        transportIds.length ? transportDao.getById(transportIds) : [],
        placeIds.length ? placeDao.getById(placeIds) : [],
        accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],

    ]);


    const transports = travelPlanTransports.map((TravelPlanItem: any) => {
        const core = transportsData.find(t => t.transport_id === TravelPlanItem.transport_id);
        return { ...(core ?? {}), ...TravelPlanItem };
    });

    const places = travelPlanPlaces.map((TravelPlanItem: any) => {
        const core = placesData.find(p => p.place_id === TravelPlanItem.place_id);
        return { ...(core ?? {}), ...TravelPlanItem };
    });

    const accommodations = travelPlanAccommodations.map(TravelPlanItem => {
        const core = accommodationsData.find(a => a.accommodation_id === TravelPlanItem.accommodation_id);
        return { ...(core ?? {}), ...TravelPlanItem };
    });

    
    const  enrichedTravelPlan = {
        ...travelPlan,
        transports,
        places,
        accommodations
    };
    
    return new TravelPlanResponseDTO(enrichedTravelPlan);
}


export const updateTravelPlan = async (travel_plan_id: string, input: travelPlanInput): Promise<string> => {
    const travelPlan = await travelPlanDao.getTravelPlanById(travel_plan_id);

    if(!travelPlan) 
    {
        throw new AppError("travel not found", HTTP_STATUS.NOT_FOUND);
    }

   
    const isExist = await travelPlanMemberdao.memberExists(input.planner_id!, travel_plan_id); 

    if(isExist && isExist.role === "member") 
    {
        throw new AppError("you are not allowed to update the travelplan", HTTP_STATUS.UNAUTHORIZED);
    }
    const existingTravelPlan = await travelPlanDao.updateTravelPlanById(travel_plan_id, input);
   
    if (input.accommodations?.length) {

        await travelPlanAccommodationDao.deleteById(travel_plan_id);
        for (let index=0; index<input.accommodations?.length;index++) {
            const accommodationRecord = await accommodationDao.getAccommodationByTypeAndName(input.accommodations[index].accommodation_type,
                input.accommodations[index].accommodation_name
            );

            if (accommodationRecord) 
            {
                await travelPlanAccommodationDao.createTravelPlanAccommodation(
                    travel_plan_id,
                    accommodationRecord.accommodation_id
                );
            } 
            else 
            {
               
                const data: accommodationCreation = {
                    accommodation_name : input.accommodations[index].accommodation_name,
                    accommodation_type : input.accommodations[index].accommodation_type,
                    latitude : input.accommodations[index].latitude,
                    longitude : input.accommodations[index].longitude 
                };
                const accommodation: getAccommodation = await accommodationDao.createAccommodation(data) ;

                await travelPlanAccommodationDao.createTravelPlanAccommodation(
                    travel_plan_id,
                    accommodation.accommodation_id,
                    
                );
                
            }
        }
    }

    if (input.transports?.length) {
       await travelPlanTransportDao.deleteById(travel_plan_id);
       for (let index=0; index<input.transports?.length;index++) {
            const transportRecord = await transportDao.getTransportByTypeAndName(input.transports[index].transport_type,
                input.transports[index].transport_name
            );

            if (transportRecord) {
                await travelPlanTransportDao.createTravelPlanTransport(
                    travel_plan_id,
                    transportRecord.transport_id
                );
            } 
            else
            {
               
                const data: transportCreation = {
                    transport_type : input.transports[index].transport_type,
                    transport_name : input.transports[index].transport_name,
              
                };

                const transport: getTransport = await transportDao.createTransport(data); 

                await travelPlanTransportDao.createTravelPlanTransport(
                    travel_plan_id,
                    transport.transport_id
            
                );
            }
        }   
    }


    if (input.places?.length) {
       await travelPlanPlaceDao.deleteById(travel_plan_id);
       for (let index=0; index<input.places?.length;index++) {
            const placeRecord = await placeDao.getPlaceByName(input.places[index].place_name);

            if (placeRecord) {
                await travelPlanPlaceDao.createTravelPlanPlace(
                    travel_plan_id,
                    placeRecord.place_id,
               
                );
            } 
            else 
            {
                const data: placeCreation = {
                    place_name : input.places[index].place_name,
                    latitude : input.places[index].latitude,
                    longitude : input.places[index].longitude 
                };
                const place: getPlace = await placeDao.createPlace(data); 

                await travelPlanPlaceDao.createTravelPlanPlace(
                    travel_plan_id,
                    place.place_id
                );
            }
        }
    }

    return "travel plan updated successfully";
};

export const deleteTravelPlan = async(travel_plan_id: string, user_id: string): Promise<string> => {
    const travelPlan = await travelPlanDao.getTravelPlanById(travel_plan_id);

    if(!travelPlan) 
    {
        throw new AppError("travel plan not found", HTTP_STATUS.NOT_FOUND);
    }

    const isExist = await travelPlanMemberdao.memberExists(user_id, travel_plan_id); 
    if(isExist && isExist.role !== "creator") 
    {
        throw new AppError("you are not allowed to delete the travelplan", HTTP_STATUS.FORBIDDEN);
    }
    const status: string = await travelPlanDao.deleteTravelPlanById(travel_plan_id);
    return status;
}


export const getTravelPlansByMemberId = async(user_id: string): Promise<TravelPlanResponseDTO[]> => {
    const travelPlans = await travelPlanDao.getTravelPlanByMemberId(user_id); 

    const enrichedTravelPlans: travelPlanOutput[] = await Promise.all(
            travelPlans.map(async (travelPlan) => {
                const travel_plan_id = travelPlan.travel_plan_id;
            
                const [
                    travelPlanTransports,
                    travelPlanPlaces,
                    travelPlanAccommodations,
                    
                ] = await Promise.all([
                    travelPlanTransportDao.getById(travel_plan_id),
                    travelPlanPlaceDao.getById(travel_plan_id),
                    travelPlanAccommodationDao.getById(travel_plan_id),
                    
                ]);

            
                const transportIds = travelPlanTransports.map((t: any) => t.transport_id).filter(Boolean);
                const placeIds = travelPlanPlaces.map((p: any) => p.place_id).filter(Boolean);
                const accommodationIds = travelPlanAccommodations.map(a => a.accommodation_id).filter(Boolean);

                
                const [
                    transportsData,
                    placesData,
                    accommodationsData
                
                ] = await Promise.all([
                    transportIds.length ? transportDao.getById(transportIds) : [],
                    placeIds.length ? placeDao.getById(placeIds) : [],
                    accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
            
                ]);

            
                const transports = travelPlanTransports.map((TravelPlanItem: any) => {
                    const core = transportsData.find(t => t.transport_id === TravelPlanItem.transport_id);
                    return { ...(core ?? {}), ...TravelPlanItem };
                });

                const places = travelPlanPlaces.map((TravelPlanItem: any) => {
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
            })
        );

    return enrichedTravelPlans.map((TravelPlan) => new TravelPlanResponseDTO(TravelPlan));   
}
