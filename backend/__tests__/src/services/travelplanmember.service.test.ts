import * as TravelPlanMemberService from '../../../src/services/travelplanmember.service.ts';
import travelPlanMemberdao from '../../../src/repositories/dao/travelplanmember.repository.ts';
import userDAO from '../../../src/repositories/dao/user.respository.ts';
import { AppError } from '../../../src/utils/appError.ts';

jest.mock('../../../src/repositories/dao/travelplanmember.repository.ts');
jest.mock('../../../src/repositories/dao/user.respository.ts');

// i need to come back here
// Mock data
const mockMember = {
  travel_plan_id: 'tp001',
  user_id: 'u001',
  role: 'member',
  created_at: new Date(),
  updated_at: new Date(),
};

const mockMemberWithUser = {
  ...mockMember,
  email: 'user@example.com',
  username: 'john',
};

describe('TravelPlanMemberService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addTravelPlanMember', () => {
        it('should add a travel plan member and return DTO', async () => {
            (travelPlanMemberdao.addTravelPlanMember as jest.Mock).mockResolvedValue(mockMember);

            const result = await TravelPlanMemberService.addTravelPlanMember({
                travel_plan_id: 'tp001',
                user_id: 'u001',
                role: 'member',
            });

            expect(travelPlanMemberdao.addTravelPlanMember).toHaveBeenCalledWith({
                travel_plan_id: 'tp001',
                user_id: 'u001',
                role: 'member',
            });

            // expect(result).toEqual(expect.objectContaining({
            //     travel_plan_id: 'tp001',
            //     user_id: 'u001',
            //     travel_plan_member_role: 'member',
            //     email: undefined,
            //     username: undefined,
            // }));
        });
    });

    describe('getTravelPlanMemmebrs', () => {
        it('should get all travel plan members with username and email', async () => {
            (travelPlanMemberdao.getTravelPlanMemmebrs as jest.Mock).mockResolvedValue([{ ...mockMember }]);
            (userDAO.getUserByID as jest.Mock).mockResolvedValue({
                email: 'user@example.com',
                username: 'john',
            });

            const result = await TravelPlanMemberService.getTravelPlanMemmebrs('tp001');

            expect(travelPlanMemberdao.getTravelPlanMemmebrs).toHaveBeenCalledWith('tp001');
            expect(userDAO.getUserByID).toHaveBeenCalledWith('u001');

            // expect(result).toEqual([
            //     expect.objectContaining({
            //     travel_plan_id: 'tp001',
            //     user_id: 'u001',
            //     travel_plan_member_role: 'member',
            //     email: 'user@example.com',
            //     username: 'john',
            //     }),
            // ]);
        });
    });

    describe('updateTravelPlanMemberRole', () => {
        it('should update member role if requester is creator', async () => {
            (travelPlanMemberdao.memberExists as jest.Mock).mockResolvedValue({
                role: 'creator',
            });
            (travelPlanMemberdao.updateTravelPlanMemberRole as jest.Mock).mockResolvedValue(mockMember);

            const result = await TravelPlanMemberService.updateTravelPlanMemberRole(
                {
                travel_plan_id: 'tp001',
                user_id: 'u001',
                role: 'admin',
                },
                'u999' // requester
            );

            expect(travelPlanMemberdao.memberExists).toHaveBeenCalledWith('u999', 'tp001');
            expect(travelPlanMemberdao.updateTravelPlanMemberRole).toHaveBeenCalledWith({
                travel_plan_id: 'tp001',
                user_id: 'u001',
                role: 'admin',
            });

            // expect(result).toEqual(expect.objectContaining({
            //     travel_plan_id: 'tp001',
            //     user_id: 'u001',
            //     travel_plan_member_role: 'member',
            //     email: undefined,
            //     username: undefined,
            // }));
        });

        it('should throw error if requester is not creator', async () => {
            (travelPlanMemberdao.memberExists as jest.Mock).mockResolvedValue({
                role: 'member',
            });

            await expect(TravelPlanMemberService.updateTravelPlanMemberRole(
                {
                travel_plan_id: 'tp001',
                user_id: 'u001',
                role: 'admin',
                },
                'u999'
            )).rejects.toThrow(AppError);

            expect(travelPlanMemberdao.updateTravelPlanMemberRole).not.toHaveBeenCalled();
        });

        // it('should throw error if requester does not exist', async () => {
        //     (travelPlanMemberdao.memberExists as jest.Mock).mockResolvedValue(null);

        //     await expect(TravelPlanMemberService.updateTravelPlanMemberRole(
        //         {
        //         travel_plan_id: 'tp001',
        //         user_id: 'u001',
        //         role: 'admin',
        //         },
        //         'u999'
        //     )).rejects.toThrow(AppError);
        // });
    });
});
