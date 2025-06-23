import { TravelPlanResponseDTO } from "../DTOs/travelplan.dto.ts";
import travelPlanDao from "../repositories/dao/travelplan.dao.ts";
import { travelPlanInput, travelPlanOutput } from "../types/travelplan.type.ts";
import accommodationDao from "../repositories/dao/accommodation.dao.ts";
import travelPlanAccommodationDao from "../repositories/dao/travelplan_accommodation.dao.ts";
import transportDao from "../repositories/dao/transport.dao.ts";
import travelPlanTransportDao from "../repositories/dao/travelplan_transport.dao.ts";
import placeDao from "../repositories/dao/place.dao.ts";
import travelPlanPlaceDao from "../repositories/dao/travelplan_place.dao.ts";
import { AppError } from "../utils/appError.ts";

export const craeteTravelPlan = async(input: travelPlanInput): Promise<string> => {
    // first e core table, then services table 
    const createdPlan: any = await travelPlanDao.craeteTravelPlan(input)
    
    const travel_plan_id = createdPlan.travel_plan_id

    if(input.accommodations?.length) {
    // at first search in accommodations table

        for (let index=0; index<input.accommodations?.length;index++) {
            const accommodationRecord = await accommodationDao.getAccommodationByTypeAndName(input.accommodations[index].accommodation_type,
                input.accommodations[index].accommodation_name
            )

            if (accommodationRecord) {
                await travelPlanAccommodationDao.createTravelPlanAccommodation(
                travel_plan_id,
                accommodationRecord.accommodation_id
                );
            } else {
                // nothing
            }
        }
    }

    if(input.transports?.length) {
        for (let index=0; index<input.transports?.length;index++) {
            const transportRecord = await transportDao.getTransportByTypeAndName(input.transports[index].transport_type,
                input.transports[index].transport_name
            )

            if (transportRecord) {
                await travelPlanTransportDao.createTravelPlanTransport(
                travel_plan_id,
                transportRecord.transport_id
            );
            } else {
                // nothing
            }
        }   
    }
    
    if(input.places?.length) 
    {
        for (let index=0; index<input.places?.length;index++) {
            const placeRecord = await placeDao.getPlaceByName(input.places[index].place_name)

            if (placeRecord) {
                await travelPlanPlaceDao.createTravelPlanPlace(
                travel_plan_id,
                placeRecord.place_id,
               
            );
            } else {
                // nothing
            }
        }
    }

    return "travel plan created"
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
    const travelPlan= await travelPlanDao.getTravelPlanById(travel_plan_id)
   
    if(!travelPlan) 
    {
        throw new AppError('post not found', 404)
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
    
    return new TravelPlanResponseDTO(enrichedTravelPlan)
}


export const updateTravelPlan = async (travel_plan_id: string, input: travelPlanInput): Promise<string> => {
    const existingTravelPlan = await travelPlanDao.updateTravelPlanById(travel_plan_id, input)
    if (!existingTravelPlan) 
    {
        throw new AppError("travel not found", 404);
    }


    if (input.accommodations?.length) {
        for (const acc of input.accommodations) {
        const accommodationRecord = await accommodationDao.getAccommodationByTypeAndName(
            acc.accommodation_type,
            acc.accommodation_name
        );

        if (accommodationRecord) {
            await travelPlanAccommodationDao.updateTravelPlanAccommodation(
            travel_plan_id,
            accommodationRecord.accommodation_id,
            
            );
        }
        }
    }

    if (input.transports?.length) {
        for (const tr of input.transports) {
        const transportRecord = await transportDao.getTransportByTypeAndName(
            tr.transport_type,
            tr.transport_name
        );

        if (transportRecord) {
            await travelPlanTransportDao.updateTravelPlanTransport(
            travel_plan_id,
            transportRecord.transport_id,
            
            );
        }
        }
    }


    if (input.places?.length) {
        for (const pl of input.places) {
        const placeRecord = await placeDao.getPlaceByName(pl.place_name);

        if (placeRecord) {
            await travelPlanPlaceDao.updateTravelPlanPlace(
            travel_plan_id,
            placeRecord.place_id,
            
            );
        }
        }
    }

    return "Post updated successfully";
};

export const deleteTravelPlan = async(travel_plan_id: string): Promise<string> => {
    const status: string = await travelPlanDao.deleteTravelPlanById(travel_plan_id)
    return status
}


// export const getTravelPlansByUserId = async(user_id: number): Promise<TravelPlanResponseDTO[]> => {
//     const travelPlans = await travelPlanDao.getTravelPlanByUser(user_id); 

//     const enrichedTravelPlans: travelPlanOutput[] = await Promise.all(
//             travelPlans.map(async (travelPlan) => {
//             const travel_plan_id = travelPlan.travel_plan_id
        
//             const [
//                 travelPlanTransports,
//                 travelPlanPlaces,
//                 travelPlanAccommodations,
                
//             ] = await Promise.all([
//                 travelPlanTransportDao.getById(travel_plan_id),
//                 travelPlanPlaceDao.getById(travel_plan_id),
//                 travelPlanAccommodationDao.getById(travel_plan_id),
                
//             ]);

        
//             const transportIds = travelPlanTransports.map((t: any) => t.transport_id).filter(Boolean);
//             const placeIds = travelPlanPlaces.map((p: any) => p.place_id).filter(Boolean);
//             const accommodationIds = travelPlanAccommodations.map(a => a.accommodation_id).filter(Boolean);

            
//             const [
//                 transportsData,
//                 placesData,
//                 accommodationsData
               
//             ] = await Promise.all([
//                 transportIds.length ? transportDao.getById(transportIds) : [],
//                 placeIds.length ? placeDao.getById(placeIds) : [],
//                 accommodationIds.length ? accommodationDao.getById(accommodationIds) : [],
        
//             ]);

        
//             const transports = travelPlanTransports.map((TravelPlanItem: any) => {
//                 const core = transportsData.find(t => t.transport_id === TravelPlanItem.transport_id);
//                 return { ...(core ?? {}), ...TravelPlanItem };
//             });

//             const places = travelPlanPlaces.map((TravelPlanItem: any) => {
//                 const core = placesData.find(p => p.place_id === TravelPlanItem.place_id);
//                 return { ...(core ?? {}), ...TravelPlanItem };
//             });

//             const accommodations = travelPlanAccommodations.map(TravelPlanItem => {
//                 const core = accommodationsData.find(a => a.accommodation_id === TravelPlanItem.accommodation_id);
//                 return { ...(core ?? {}), ...TravelPlanItem };
//             });

           
//             return {
//                 ...travelPlan,
//                 transports,
//                 places,
//                 accommodations
//             };
//             })
//         );

//     return enrichedTravelPlans.map((TravelPlan) => new TravelPlanResponseDTO(TravelPlan));   
// }
