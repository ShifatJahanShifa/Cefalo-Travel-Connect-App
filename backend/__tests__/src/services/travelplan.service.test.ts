import {
  craeteTravelPlan,
  getTravelPlans,
  getTravelPlanById,
  updateTravelPlan,
  deleteTravelPlan,
  getTravelPlansByMemberId,
} from '../../../src/services/travelplan.service.ts';

import travelPlanDao from '../../../src/repositories/dao/travelplan.repository.ts';
import accommodationDao from '../../../src/repositories/dao/accommodation.repository.ts';
import travelPlanAccommodationDao from '../../../src/repositories/dao/travelplan_accommodation.repository.ts';
import transportDao from '../../../src/repositories/dao/transport.repository.ts';
import travelPlanTransportDao from '../../../src/repositories/dao/travelplan_transport.repository.ts';
import placeDao from '../../../src/repositories/dao/place.repository.ts';
import travelPlanPlaceDao from '../../../src/repositories/dao/travelplan_place.repository.ts';
import travelPlanMemberdao from '../../../src/repositories/dao/travelplanmember.repository.ts';
import { TravelPlanResponseDTO } from '../../../src/DTOs/travelplan.dto.ts';
import { AppError } from '../../../src/utils/appError.ts';


jest.mock('../../../src/repositories/dao/travelplan.repository.ts');
jest.mock('../../../src/repositories/dao/accommodation.repository.ts');
jest.mock('../../../src/repositories/dao/travelplan_accommodation.repository.ts');
jest.mock('../../../src/repositories/dao/transport.repository.ts');
jest.mock('../../../src/repositories/dao/travelplan_transport.repository.ts');
jest.mock('../../../src/repositories/dao/place.repository.ts');
jest.mock('../../../src/repositories/dao/travelplan_place.repository.ts');
jest.mock('../../../src/repositories/dao/travelplanmember.repository.ts');

describe('TravelPlan Service', () => {

    const mockTravelPlan = {
        travel_plan_id: 'plan1',
        planner_id: 'user1',
        title: 'Test Travel Plan',
        description: 'Test Description',
        start_date: '12-12-2025', 
        end_data: '12-12-2025', 
        note: 'my travel plan', 
        estimated_cost: 23
    };

    const mockTravelPlanDTO = {
        travel_plan_id: 'plan1',
        planner_id: 'user1',
        title: 'Test Travel Plan',
        description: 'Test Description',
        transports: [],
        places: [],
        accommodations: [],
    };

    const mockAccommodation = {
        accommodation_id: 'acc1',
        accommodation_name: 'Test Hotel',
        accommodation_type: 'Hotel',
        latitude: 40.7128,
        longitude: -74.0060,
    };

    const mockTransport = {
        transport_id: 'trans1',
        transport_name: 'Test Bus',
        transport_type: 'Bus',
    };

    const mockPlace = {
        place_id: 'place1',
        place_name: 'Test Place',
        latitude: 40.7128,
        longitude: -74.0060,
    };

    const mockTravelPlanMember = {
        travel_plan_id: 'plan1',
        user_id: 'user1',
        role: 'creator',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('craeteTravelPlan', () => {
        const input = {
        planner_id: 'user1',
        title: 'Test Travel Plan',
        description: 'Test Description',
        start_date: '12-12-2025', 
        end_data: '12-12-2025', 
        note: 'my travel plan', 
        estimated_cost: 23,
        accommodations: [
            {
            accommodation_name: 'Test Hotel',
            accommodation_type: 'Hotel',
            latitude: 40.7128,
            longitude: -74.0060,
            },
        ],
        transports: [
            {
            transport_name: 'Test Bus',
            transport_type: 'Bus',
            },
        ],
        places: [
            {
            place_name: 'Test Place',
            latitude: 40.7128,
            longitude: -74.0060,
            },
        ],
        };

        it('should create a travel plan, associated entities, and creator member, returning success message', async () => {
            (travelPlanDao.craeteTravelPlan as jest.Mock).mockResolvedValue(mockTravelPlan);
            (accommodationDao.getAccommodationByTypeAndName as jest.Mock).mockResolvedValue(null);
            (accommodationDao.createAccommodation as jest.Mock).mockResolvedValue(mockAccommodation);
            (travelPlanAccommodationDao.createTravelPlanAccommodation as jest.Mock).mockResolvedValue(undefined);
            (transportDao.getTransportByTypeAndName as jest.Mock).mockResolvedValue(null);
            (transportDao.createTransport as jest.Mock).mockResolvedValue(mockTransport);
            (travelPlanTransportDao.createTravelPlanTransport as jest.Mock).mockResolvedValue(undefined);
            (placeDao.getPlaceByName as jest.Mock).mockResolvedValue(null);
            (placeDao.createPlace as jest.Mock).mockResolvedValue(mockPlace);
            (travelPlanPlaceDao.createTravelPlanPlace as jest.Mock).mockResolvedValue(undefined);
            (travelPlanMemberdao.addTravelPlanMember as jest.Mock).mockResolvedValue(mockTravelPlanMember);

            const result = await craeteTravelPlan(input);

            expect(travelPlanDao.craeteTravelPlan).toHaveBeenCalledWith(input);
            expect(accommodationDao.createAccommodation).toHaveBeenCalledWith({
                accommodation_name: 'Test Hotel',
                accommodation_type: 'Hotel',
                latitude: 40.7128,
                longitude: -74.0060,
            });
            expect(travelPlanAccommodationDao.createTravelPlanAccommodation).toHaveBeenCalledWith('plan1', 'acc1');
            expect(transportDao.createTransport).toHaveBeenCalledWith({
                transport_name: 'Test Bus',
                transport_type: 'Bus',
            });
            expect(travelPlanTransportDao.createTravelPlanTransport).toHaveBeenCalledWith('plan1', 'trans1');
            expect(placeDao.createPlace).toHaveBeenCalledWith({
                place_name: 'Test Place',
                latitude: 40.7128,
                longitude: -74.0060,
            });
            expect(travelPlanPlaceDao.createTravelPlanPlace).toHaveBeenCalledWith('plan1', 'place1');
            expect(travelPlanMemberdao.addTravelPlanMember).toHaveBeenCalledWith({
                travel_plan_id: 'plan1',
                user_id: 'user1',
                role: 'creator',
            });
            expect(result).toBe('travel plan created');
        });

        it('should create a travel plan with existing entities', async () => {
            (travelPlanDao.craeteTravelPlan as jest.Mock).mockResolvedValue(mockTravelPlan);
            (accommodationDao.getAccommodationByTypeAndName as jest.Mock).mockResolvedValue(mockAccommodation);
            (travelPlanAccommodationDao.createTravelPlanAccommodation as jest.Mock).mockResolvedValue(undefined);
            (transportDao.getTransportByTypeAndName as jest.Mock).mockResolvedValue(mockTransport);
            (travelPlanTransportDao.createTravelPlanTransport as jest.Mock).mockResolvedValue(undefined);
            (placeDao.getPlaceByName as jest.Mock).mockResolvedValue(mockPlace);
            (travelPlanPlaceDao.createTravelPlanPlace as jest.Mock).mockResolvedValue(undefined);
            (travelPlanMemberdao.addTravelPlanMember as jest.Mock).mockResolvedValue(mockTravelPlanMember);

            const result = await craeteTravelPlan(input);

            expect(accommodationDao.createAccommodation).not.toHaveBeenCalled();
            expect(transportDao.createTransport).not.toHaveBeenCalled();
            expect(placeDao.createPlace).not.toHaveBeenCalled();
            expect(result).toBe('travel plan created');
        });

        it('should handle empty optional arrays', async () => {
            (travelPlanDao.craeteTravelPlan as jest.Mock).mockResolvedValue(mockTravelPlan);
            (travelPlanMemberdao.addTravelPlanMember as jest.Mock).mockResolvedValue(mockTravelPlanMember);

            const result = await craeteTravelPlan(input);

            expect(travelPlanDao.craeteTravelPlan).toHaveBeenCalled();
            expect(result).toBe('travel plan created');
        });


        it('should throw AppError when member creation fails in createTravelPlan', async () => {
            (travelPlanDao.craeteTravelPlan as jest.Mock).mockResolvedValue(mockTravelPlan);
            (travelPlanMemberdao.addTravelPlanMember as jest.Mock).mockResolvedValue(undefined);

            await expect(craeteTravelPlan(input)).rejects.toThrow(new AppError('failed to add creator of the travel plan', 500));
        });


        it('should throw an AppError if adding creator member fails', async () => {
            (travelPlanDao.craeteTravelPlan as jest.Mock).mockResolvedValue(mockTravelPlan);
            (travelPlanMemberdao.addTravelPlanMember as jest.Mock).mockResolvedValue(null);

            await expect(craeteTravelPlan(input))
                .rejects.toThrow(new AppError('failed to add creator of the travel plan', 500));
        });


        // adding more testcase for increasing branch coverage

        it('should skip accommodations creation if accommodations is empty', async () => {
            const noAccommodations = { ...input, accommodations: [] };

            (travelPlanDao.craeteTravelPlan as jest.Mock).mockResolvedValue(mockTravelPlan);
            (travelPlanMemberdao.addTravelPlanMember as jest.Mock).mockResolvedValue(mockTravelPlanMember);

            const result = await craeteTravelPlan(noAccommodations);

            expect(accommodationDao.getAccommodationByTypeAndName).not.toHaveBeenCalled();
            expect(accommodationDao.createAccommodation).not.toHaveBeenCalled();
            expect(travelPlanAccommodationDao.createTravelPlanAccommodation).not.toHaveBeenCalled();
            expect(result).toBe('travel plan created');
        });


        it('should skip transports creation if transports is empty', async () => {
            const noTransports = { ...input, transports: [] };

            (travelPlanDao.craeteTravelPlan as jest.Mock).mockResolvedValue(mockTravelPlan);
            (travelPlanMemberdao.addTravelPlanMember as jest.Mock).mockResolvedValue(mockTravelPlanMember);

            const result = await craeteTravelPlan(noTransports);

            expect(transportDao.getTransportByTypeAndName).not.toHaveBeenCalled();
            expect(transportDao.createTransport).not.toHaveBeenCalled();
            expect(travelPlanTransportDao.createTravelPlanTransport).not.toHaveBeenCalled();
            expect(result).toBe('travel plan created');
        });


        it('should skip places creation if places is empty', async () => {
            const noPlaces = { ...input, places: [] };

            (travelPlanDao.craeteTravelPlan as jest.Mock).mockResolvedValue(mockTravelPlan);
            (travelPlanMemberdao.addTravelPlanMember as jest.Mock).mockResolvedValue(mockTravelPlanMember);

            const result = await craeteTravelPlan(noPlaces);

            expect(placeDao.getPlaceByName).not.toHaveBeenCalled();
            expect(placeDao.createPlace).not.toHaveBeenCalled();
            expect(travelPlanPlaceDao.createTravelPlanPlace).not.toHaveBeenCalled();
            expect(result).toBe('travel plan created');
        });

        it('should create travel plan with only places input', async () => {
            const onlyPlaces = {
                ...input,
                accommodations: [],
                transports: [],
            };

            (travelPlanDao.craeteTravelPlan as jest.Mock).mockResolvedValue(mockTravelPlan);
            (placeDao.getPlaceByName as jest.Mock).mockResolvedValue(null);
            (placeDao.createPlace as jest.Mock).mockResolvedValue(mockPlace);
            (travelPlanPlaceDao.createTravelPlanPlace as jest.Mock).mockResolvedValue(undefined);
            (travelPlanMemberdao.addTravelPlanMember as jest.Mock).mockResolvedValue(mockTravelPlanMember);

            const result = await craeteTravelPlan(onlyPlaces);

            expect(placeDao.createPlace).toHaveBeenCalled();
            expect(travelPlanPlaceDao.createTravelPlanPlace).toHaveBeenCalled();
            expect(result).toBe('travel plan created');
        });


        it('should create travel plan with only transports input', async () => {
            const onlyTransports = {
                ...input,
                accommodations: [],
                places: [],
            };

            (travelPlanDao.craeteTravelPlan as jest.Mock).mockResolvedValue(mockTravelPlan);
            (transportDao.getTransportByTypeAndName as jest.Mock).mockResolvedValue(null);
            (transportDao.createTransport as jest.Mock).mockResolvedValue(mockTransport);
            (travelPlanTransportDao.createTravelPlanTransport as jest.Mock).mockResolvedValue(undefined);
            (travelPlanMemberdao.addTravelPlanMember as jest.Mock).mockResolvedValue(mockTravelPlanMember);

            const result = await craeteTravelPlan(onlyTransports);

            expect(transportDao.createTransport).toHaveBeenCalledWith({
                transport_type: 'Bus',
                transport_name: 'Test Bus',
            });
            expect(travelPlanTransportDao.createTravelPlanTransport).toHaveBeenCalledWith('plan1', 'trans1');
            expect(result).toBe('travel plan created');
        });


        it('should create travel plan with only accommodations input', async () => {
            const onlyAccommodations = {
                ...input,
                transports: [],
                places: [],
            };

            (travelPlanDao.craeteTravelPlan as jest.Mock).mockResolvedValue(mockTravelPlan);
            (accommodationDao.getAccommodationByTypeAndName as jest.Mock).mockResolvedValue(null);
            (accommodationDao.createAccommodation as jest.Mock).mockResolvedValue(mockAccommodation);
            (travelPlanAccommodationDao.createTravelPlanAccommodation as jest.Mock).mockResolvedValue(undefined);
            (travelPlanMemberdao.addTravelPlanMember as jest.Mock).mockResolvedValue(mockTravelPlanMember);

            const result = await craeteTravelPlan(onlyAccommodations);

            expect(accommodationDao.createAccommodation).toHaveBeenCalledWith({
                accommodation_name: 'Test Hotel',
                accommodation_type: 'Hotel',
                latitude: 40.7128,
                longitude: -74.0060,
            });
            expect(travelPlanAccommodationDao.createTravelPlanAccommodation).toHaveBeenCalledWith('plan1', 'acc1');
            expect(result).toBe('travel plan created');
        });


    });

    describe('getTravelPlans', () => {
        it('should return an array of enriched TravelPlanResponseDTOs', async () => {
            (travelPlanDao.getTravelPlans as jest.Mock).mockResolvedValue([mockTravelPlan]);
            (travelPlanTransportDao.getById as jest.Mock).mockResolvedValue([{ transport_id: 'trans1' }]);
            (travelPlanPlaceDao.getById as jest.Mock).mockResolvedValue([{ place_id: 'place1' }]);
            (travelPlanAccommodationDao.getById as jest.Mock).mockResolvedValue([{ accommodation_id: 'acc1' }]);
            (transportDao.getById as jest.Mock).mockResolvedValue([mockTransport]);
            (placeDao.getById as jest.Mock).mockResolvedValue([mockPlace]);
            (accommodationDao.getById as jest.Mock).mockResolvedValue([mockAccommodation]);

            const result = await getTravelPlans(1, 10);

            expect(travelPlanDao.getTravelPlans).toHaveBeenCalledWith(1, 10);
            expect(result).toHaveLength(1);
            expect(result[0]).toBeInstanceOf(TravelPlanResponseDTO);
            expect(result[0]).toEqual(expect.objectContaining({
                travel_plan_id: 'plan1',
                transports: expect.arrayContaining([expect.objectContaining({ transport_id: 'trans1' })]),
                places: expect.arrayContaining([expect.objectContaining({ place_id: 'place1' })]),
                accommodations: expect.arrayContaining([expect.objectContaining({ accommodation_id: 'acc1' })]),
            }));
        });

        it('should return an empty array if no travel plans are found', async () => {
            (travelPlanDao.getTravelPlans as jest.Mock).mockResolvedValue([]);

            const result = await getTravelPlans(1, 10);

            expect(travelPlanDao.getTravelPlans).toHaveBeenCalledWith(1, 10);
            expect(result).toEqual([]);
        });


        it('should handle travel plans with no associated transport,place,accommodation', async () => {
            (travelPlanDao.getTravelPlans as jest.Mock).mockResolvedValue([mockTravelPlan]);
            (travelPlanTransportDao.getById as jest.Mock).mockResolvedValue([]);
            (travelPlanPlaceDao.getById as jest.Mock).mockResolvedValue([]);
            (travelPlanAccommodationDao.getById as jest.Mock).mockResolvedValue([]);

            const result = await getTravelPlans(1, 10);

            expect(result[0].transports).toEqual([]);
            expect(result[0].places).toEqual([]);
            expect(result[0].accommodations).toEqual([]);
        });

    });

    describe('getTravelPlanById', () => {
        it('should return an enriched TravelPlanResponseDTO', async () => {
            (travelPlanDao.getTravelPlanById as jest.Mock).mockResolvedValue(mockTravelPlan);
            (travelPlanTransportDao.getById as jest.Mock).mockResolvedValue([{ transport_id: 'trans1' }]);
            (travelPlanPlaceDao.getById as jest.Mock).mockResolvedValue([{ place_id: 'place1' }]);
            (travelPlanAccommodationDao.getById as jest.Mock).mockResolvedValue([{ accommodation_id: 'acc1' }]);
            (transportDao.getById as jest.Mock).mockResolvedValue([mockTransport]);
            (placeDao.getById as jest.Mock).mockResolvedValue([mockPlace]);
            (accommodationDao.getById as jest.Mock).mockResolvedValue([mockAccommodation]);

            const result = await getTravelPlanById('plan1');

            expect(travelPlanDao.getTravelPlanById).toHaveBeenCalledWith('plan1');
            expect(result).toBeInstanceOf(TravelPlanResponseDTO);
        });

        it('should throw an AppError if travel plan is not found', async () => {
            (travelPlanDao.getTravelPlanById as jest.Mock).mockResolvedValue(null);

            await expect(getTravelPlanById('plan1')).rejects.toThrow(new AppError('travel plan not found', 404));
        });


        it('should handle partial enrichment where some entities are not found', async () => {
            (travelPlanDao.getTravelPlanById as jest.Mock).mockResolvedValue(mockTravelPlan);
            (travelPlanTransportDao.getById as jest.Mock).mockResolvedValue([{ transport_id: 'trans1' }]);
            (travelPlanPlaceDao.getById as jest.Mock).mockResolvedValue([{ place_id: 'place1' }]);
            (travelPlanAccommodationDao.getById as jest.Mock).mockResolvedValue([{ accommodation_id: 'acc1' }]);
            (transportDao.getById as jest.Mock).mockResolvedValue([]); 
            (placeDao.getById as jest.Mock).mockResolvedValue([mockPlace]);
            (accommodationDao.getById as jest.Mock).mockResolvedValue([]);

            const result = await getTravelPlanById('plan1');

            expect(result.transports).toEqual([{ transport_id: 'trans1' }]);
            expect(result.accommodations).toEqual([{ accommodation_id: 'acc1' }]); 
        });


        it('should skip DAO calls and return empty arrays when IDs are empty in getTravelPlanById', async () => {
            (travelPlanDao.getTravelPlanById as jest.Mock).mockResolvedValue(mockTravelPlan);
            (travelPlanTransportDao.getById as jest.Mock).mockResolvedValue([]);
            (travelPlanPlaceDao.getById as jest.Mock).mockResolvedValue([]);
            (travelPlanAccommodationDao.getById as jest.Mock).mockResolvedValue([]);

            (transportDao.getById as jest.Mock).mockResolvedValue([]);
            (placeDao.getById as jest.Mock).mockResolvedValue([]);
            (accommodationDao.getById as jest.Mock).mockResolvedValue([]);

            const result = await getTravelPlanById('plan1');

            expect(transportDao.getById).not.toHaveBeenCalled();
            expect(placeDao.getById).not.toHaveBeenCalled();
            expect(accommodationDao.getById).not.toHaveBeenCalled();

            expect(result.transports).toEqual([]);
            expect(result.places).toEqual([]);
            expect(result.accommodations).toEqual([]);
         });


    });

    describe('updateTravelPlan', () => {
        const input = {
        planner_id: 'user1',
        title: 'Test Travel Plan',
        description: 'Test Description',
        start_date: '12-12-2025', 
        end_data: '12-12-2025', 
        note: 'my travel plan', 
        estimated_cost: 23,
        accommodations: [
            {
            accommodation_name: 'Test Hotel',
            accommodation_type: 'Hotel',
            latitude: 40.7128,
            longitude: -74.0060,
            },
        ],
        transports: [
            {
            transport_name: 'Test Bus',
            transport_type: 'Bus',
            },
        ],
        places: [
            {
            place_name: 'Test Place',
            latitude: 40.7128,
            longitude: -74.0060,
            },
        ],
        };

        it('should update a travel plan and associated entities', async () => {
            (travelPlanDao.getTravelPlanById as jest.Mock).mockResolvedValue(null); 
            (travelPlanMemberdao.memberExists as jest.Mock).mockResolvedValue(null);
            (travelPlanDao.updateTravelPlanById as jest.Mock).mockResolvedValue(mockTravelPlan);
            (accommodationDao.getAccommodationByTypeAndName as jest.Mock).mockResolvedValue(mockAccommodation);
            (travelPlanAccommodationDao.updateTravelPlanAccommodation as jest.Mock).mockResolvedValue(undefined);
            (transportDao.getTransportByTypeAndName as jest.Mock).mockResolvedValue(mockTransport);
            (travelPlanTransportDao.updateTravelPlanTransport as jest.Mock).mockResolvedValue(undefined);
            (placeDao.getPlaceByName as jest.Mock).mockResolvedValue(mockPlace);
            (travelPlanPlaceDao.updateTravelPlanPlace as jest.Mock).mockResolvedValue(undefined);

            const result = await updateTravelPlan('plan1', input);

            expect(travelPlanDao.getTravelPlanById).toHaveBeenCalledWith('plan1');
            expect(travelPlanMemberdao.memberExists).toHaveBeenCalledWith('user1', 'plan1');
            expect(travelPlanDao.updateTravelPlanById).toHaveBeenCalledWith('plan1', input);
            expect(travelPlanAccommodationDao.updateTravelPlanAccommodation).toHaveBeenCalledWith('plan1', 'acc1');
            expect(travelPlanTransportDao.updateTravelPlanTransport).toHaveBeenCalledWith('plan1', 'trans1');
            expect(travelPlanPlaceDao.updateTravelPlanPlace).toHaveBeenCalledWith('plan1', 'place1');
            expect(result).toBe('travel plan updated successfully');
        });

        it('should throw an AppError if travel plan is not found', async () => {
            (travelPlanDao.getTravelPlanById as jest.Mock).mockResolvedValue(mockTravelPlan); 

            await expect(updateTravelPlan('plan1', input)).rejects.toThrow(new AppError('travel not found', 404));
        });

        it('should throw an AppError if user is a member but not creator', async () => {
            (travelPlanDao.getTravelPlanById as jest.Mock).mockResolvedValue(null); 
            (travelPlanMemberdao.memberExists as jest.Mock).mockResolvedValue({ role: 'member' });

            await expect(updateTravelPlan('plan1', input)).rejects.toThrow(new AppError('you are not allowed to update the travelplan', 403));
        });


        it('should update travel plan without updating any associated entities if none are provided', async () => {
            const emptyInput = {
                planner_id: 'user1',
                title: 'Updated Plan',
                description: 'New desc',
                start_date: '12-12-2025',
                end_data: '13-12-2025',
                note: 'note',
                estimated_cost: 100,
                accommodations: [],
                transports: [],
                places: [],
            };

            (travelPlanDao.getTravelPlanById as jest.Mock).mockResolvedValue(null);
            (travelPlanMemberdao.memberExists as jest.Mock).mockResolvedValue({ role: 'creator' });
            (travelPlanDao.updateTravelPlanById as jest.Mock).mockResolvedValue(mockTravelPlan);

            const result = await updateTravelPlan('plan1', emptyInput);
            expect(result).toBe('travel plan updated successfully');
        });


        it('should skip updates if related entity not found (e.g., accommodation)', async () => {
            (travelPlanDao.getTravelPlanById as jest.Mock).mockResolvedValue(null);
            (travelPlanMemberdao.memberExists as jest.Mock).mockResolvedValue({ role: 'creator' });
            (travelPlanDao.updateTravelPlanById as jest.Mock).mockResolvedValue(mockTravelPlan);
            (accommodationDao.getAccommodationByTypeAndName as jest.Mock).mockResolvedValue(null);
            (transportDao.getTransportByTypeAndName as jest.Mock).mockResolvedValue(null);
            (placeDao.getPlaceByName as jest.Mock).mockResolvedValue(null);

            const input = {
                planner_id: 'user1',
                title: 'Updated',
                description: 'desc',
                start_date: '12-12-2025',
                end_data: '12-12-2025',
                note: '',
                estimated_cost: 0,
                accommodations: [mockAccommodation],
                transports: [mockTransport],
                places: [mockPlace],
            };

            const result = await updateTravelPlan('plan1', input);

            expect(travelPlanAccommodationDao.updateTravelPlanAccommodation).not.toHaveBeenCalled();
            expect(travelPlanTransportDao.updateTravelPlanTransport).not.toHaveBeenCalled();
            expect(travelPlanPlaceDao.updateTravelPlanPlace).not.toHaveBeenCalled();
        });


        it('should update travel plan with only accommodations input', async () => {
            const inputOnlyAcc = {
                ...input,
                transports: [],
                places: [],
            };

            (travelPlanDao.getTravelPlanById as jest.Mock).mockResolvedValue(null);
            (travelPlanMemberdao.memberExists as jest.Mock).mockResolvedValue({ role: 'creator' });
            (travelPlanDao.updateTravelPlanById as jest.Mock).mockResolvedValue(mockTravelPlan);
            (accommodationDao.getAccommodationByTypeAndName as jest.Mock).mockResolvedValue(mockAccommodation);
            (travelPlanAccommodationDao.updateTravelPlanAccommodation as jest.Mock).mockResolvedValue(undefined);

            const result = await updateTravelPlan('plan1', inputOnlyAcc);

            expect(travelPlanAccommodationDao.updateTravelPlanAccommodation).toHaveBeenCalledWith('plan1', 'acc1');
            expect(result).toBe('travel plan updated successfully');
        });


        it('should update travel plan with only transports input', async () => {
            const inputOnlyTransports = {
                ...input,
                accommodations: [],
                places: [],
            };

            (travelPlanDao.getTravelPlanById as jest.Mock).mockResolvedValue(null);
            (travelPlanMemberdao.memberExists as jest.Mock).mockResolvedValue({ role: 'creator' });
            (travelPlanDao.updateTravelPlanById as jest.Mock).mockResolvedValue(mockTravelPlan);
            (transportDao.getTransportByTypeAndName as jest.Mock).mockResolvedValue(mockTransport);
            (travelPlanTransportDao.updateTravelPlanTransport as jest.Mock).mockResolvedValue(undefined);

            const result = await updateTravelPlan('plan1', inputOnlyTransports);

            expect(travelPlanTransportDao.updateTravelPlanTransport).toHaveBeenCalledWith('plan1', 'trans1');
            expect(result).toBe('travel plan updated successfully');
        });


        it('should update travel plan with only places input', async () => {
            const inputOnlyPlaces = {
                ...input,
                accommodations: [],
                transports: [],
            };

            (travelPlanDao.getTravelPlanById as jest.Mock).mockResolvedValue(null);
            (travelPlanMemberdao.memberExists as jest.Mock).mockResolvedValue({ role: 'creator' });
            (travelPlanDao.updateTravelPlanById as jest.Mock).mockResolvedValue(mockTravelPlan);
            (placeDao.getPlaceByName as jest.Mock).mockResolvedValue(mockPlace);
            (travelPlanPlaceDao.updateTravelPlanPlace as jest.Mock).mockResolvedValue(undefined);

            const result = await updateTravelPlan('plan1', inputOnlyPlaces);

            expect(travelPlanPlaceDao.updateTravelPlanPlace).toHaveBeenCalledWith('plan1', 'place1');
            expect(result).toBe('travel plan updated successfully');
        });

    });

    describe('deleteTravelPlan', () => {
        it('should delete a travel plan and return status', async () => {
            (travelPlanDao.getTravelPlanById as jest.Mock).mockResolvedValue(null); // Assuming bug fix
            (travelPlanMemberdao.memberExists as jest.Mock).mockResolvedValue({ role: 'creator' });
            (travelPlanDao.deleteTravelPlanById as jest.Mock).mockResolvedValue('Travel plan deleted successfully');

            const result = await deleteTravelPlan('plan1', 'user1');

            expect(travelPlanDao.getTravelPlanById).toHaveBeenCalledWith('plan1');
            expect(travelPlanMemberdao.memberExists).toHaveBeenCalledWith('user1', 'plan1');
            expect(travelPlanDao.deleteTravelPlanById).toHaveBeenCalledWith('plan1');
            expect(result).toBe('Travel plan deleted successfully');
        });

        it('should throw an AppError if travel plan is not found', async () => {
            (travelPlanDao.getTravelPlanById as jest.Mock).mockResolvedValue(mockTravelPlan); 

            await expect(deleteTravelPlan('plan1', 'user1')).rejects.toThrow(new AppError('travel plan not found', 404));
        });

        it('should throw an AppError if user is not creator', async () => {
            (travelPlanDao.getTravelPlanById as jest.Mock).mockResolvedValue(null); 
            (travelPlanMemberdao.memberExists as jest.Mock).mockResolvedValue({ role: 'member' });

            await expect(deleteTravelPlan('plan1', 'user1')).rejects.toThrow(new AppError('you are not allowed to delete the travelplan', 403));
        });

        
        it('should throw error if deletion unexpectedly fails', async () => {
            (travelPlanDao.getTravelPlanById as jest.Mock).mockResolvedValue(null);
            (travelPlanMemberdao.memberExists as jest.Mock).mockResolvedValue({ role: 'creator' });
            (travelPlanDao.deleteTravelPlanById as jest.Mock).mockRejectedValue(new Error('Delete failed'));

            await expect(deleteTravelPlan('plan1', 'user1')).rejects.toThrow('Delete failed');
        });


        it('should throw if member check returns null during deletion', async () => {
            (travelPlanDao.getTravelPlanById as jest.Mock).mockResolvedValue(null);
            (travelPlanMemberdao.memberExists as jest.Mock).mockResolvedValue(null);

            await expect(deleteTravelPlan('plan1', 'user1')).rejects.toThrow('Delete failed');
        });

    });

    describe('getTravelPlansByMemberId', () => {
        it('should return an array of enriched TravelPlanResponseDTOs for a member', async () => {
            (travelPlanDao.getTravelPlanByMemberId as jest.Mock).mockResolvedValue([mockTravelPlan]);
            (travelPlanTransportDao.getById as jest.Mock).mockResolvedValue([{ transport_id: 'trans1' }]);
            (travelPlanPlaceDao.getById as jest.Mock).mockResolvedValue([{ place_id: 'place1' }]);
            (travelPlanAccommodationDao.getById as jest.Mock).mockResolvedValue([{ accommodation_id: 'acc1' }]);
            (transportDao.getById as jest.Mock).mockResolvedValue([mockTransport]);
            (placeDao.getById as jest.Mock).mockResolvedValue([mockPlace]);
            (accommodationDao.getById as jest.Mock).mockResolvedValue([mockAccommodation]);

            const result = await getTravelPlansByMemberId('user1');

            expect(travelPlanDao.getTravelPlanByMemberId).toHaveBeenCalledWith('user1');
            expect(result).toHaveLength(1);
            expect(result[0]).toBeInstanceOf(TravelPlanResponseDTO);
        });

        it('should return an empty array if no travel plans are found', async () => {
            (travelPlanDao.getTravelPlanByMemberId as jest.Mock).mockResolvedValue([]);

            const result = await getTravelPlansByMemberId('user1');

            expect(travelPlanDao.getTravelPlanByMemberId).toHaveBeenCalledWith('user1');
            expect(result).toEqual([]);
        });


        it('should skip undefined entity IDs in getTravelPlansByMemberId', async () => {
            (travelPlanDao.getTravelPlanByMemberId as jest.Mock).mockResolvedValue([mockTravelPlan]);
            (travelPlanTransportDao.getById as jest.Mock).mockResolvedValue([{ transport_id: undefined }]);
            (travelPlanPlaceDao.getById as jest.Mock).mockResolvedValue([{ place_id: undefined }]);
            (travelPlanAccommodationDao.getById as jest.Mock).mockResolvedValue([{ accommodation_id: undefined }]);

            const result = await getTravelPlansByMemberId('user1');

            expect(result[0].transports).toEqual([{ transport_id: undefined }]);
        });

    });
});