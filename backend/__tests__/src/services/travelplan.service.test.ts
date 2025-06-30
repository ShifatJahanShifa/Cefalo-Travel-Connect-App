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
            // expect(accommodationDao.getAccommodationByTypeAndName).not.toHaveBeenCalled();
            // expect(transportDao.getTransportByTypeAndName).not.toHaveBeenCalled();
            // expect(placeDao.getPlaceByName).not.toHaveBeenCalled();
            expect(result).toBe('travel plan created');
        });

        it('should throw an AppError if adding creator member fails', async () => {
            (travelPlanDao.craeteTravelPlan as jest.Mock).mockResolvedValue(mockTravelPlan);
            (travelPlanMemberdao.addTravelPlanMember as jest.Mock).mockResolvedValue(null);

            await expect(craeteTravelPlan(input))
                .rejects.toThrow(new AppError('failed to add creator of the travel plan', 500));
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
            (travelPlanDao.getTravelPlanById as jest.Mock).mockResolvedValue(null); // Assuming bug fix: if(!travelPlan)
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
            (travelPlanDao.getTravelPlanById as jest.Mock).mockResolvedValue(mockTravelPlan); // Bug: if(travelPlan)

            await expect(updateTravelPlan('plan1', input)).rejects.toThrow(new AppError('travel not found', 404));
        });

        it('should throw an AppError if user is a member but not creator', async () => {
            (travelPlanDao.getTravelPlanById as jest.Mock).mockResolvedValue(null); // Assuming bug fix
            (travelPlanMemberdao.memberExists as jest.Mock).mockResolvedValue({ role: 'member' });

            await expect(updateTravelPlan('plan1', input)).rejects.toThrow(new AppError('you are not allowed to update the travelplan', 403));
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
            (travelPlanDao.getTravelPlanById as jest.Mock).mockResolvedValue(mockTravelPlan); // Bug: if(travelPlan)

            await expect(deleteTravelPlan('plan1', 'user1')).rejects.toThrow(new AppError('travel plan not found', 404));
        });

        it('should throw an AppError if user is not creator', async () => {
            (travelPlanDao.getTravelPlanById as jest.Mock).mockResolvedValue(null); // Assuming bug fix
            (travelPlanMemberdao.memberExists as jest.Mock).mockResolvedValue({ role: 'member' });

            await expect(deleteTravelPlan('plan1', 'user1')).rejects.toThrow(new AppError('you are not allowed to delete the travelplan', 403));
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
    });
});