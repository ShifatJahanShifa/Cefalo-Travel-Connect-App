import * as TravelPlanCommentService from '../../../src/services/travelplancomment.service.ts';
import travelPlanCommentDao from '../../../src/repositories/dao/travelplanmessage.repository.ts';
import travelPlanMemberdao from '../../../src/repositories/dao/travelplanmember.repository.ts';
import { AppError } from '../../../src/utils/appError.ts';

jest.mock('../../../src/repositories/dao/travelplanmessage.repository.ts');
jest.mock('../../../src/repositories/dao/travelplanmember.repository.ts');

const mockComment = {
  travel_plan_id: 'tp001',
  sender_id: 'u001',
  message: 'Excited for the trip!',
  message_id: 'msg1'
};


describe('TravelPlanCommentService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createTravelPlanComment', () => {
        it('should create a comment if member exists', async () => {
        (travelPlanMemberdao.memberExists as jest.Mock).mockResolvedValue(true);
        (travelPlanCommentDao.createComment as jest.Mock).mockResolvedValue(mockComment);

        const result = await TravelPlanCommentService.createTravelPlanComment({
            travel_plan_id: 'tp001',
            sender_id: 'u001',
            message: 'Excited for the trip!',
        });

        expect(travelPlanMemberdao.memberExists).toHaveBeenCalledWith('u001', 'tp001');
        expect(travelPlanCommentDao.createComment).toHaveBeenCalledWith({
            travel_plan_id: 'tp001',
            sender_id: 'u001',
            message: 'Excited for the trip!',
        });

        expect(result.travel_plan_id).toBe('tp001');
        expect(result.sender_id).toBe('u001');
        expect(result.message).toBe('Excited for the trip!');
        });

        it('should throw error if member does not exist', async () => {
        (travelPlanMemberdao.memberExists as jest.Mock).mockResolvedValue(false);

        await expect(
            TravelPlanCommentService.createTravelPlanComment({
            travel_plan_id: 'tp001',
            sender_id: 'u999',
            message: 'Not allowed',
            })
        ).rejects.toThrow(AppError);

        expect(travelPlanCommentDao.createComment).not.toHaveBeenCalled();
        });
    });

    describe('getTravelPlanComments', () => {
        it('should return comments for the travel plan', async () => {
        (travelPlanCommentDao.getComments as jest.Mock).mockResolvedValue([mockComment]);

        const result = await TravelPlanCommentService.getTravelPlanComments('tp001');

        expect(travelPlanCommentDao.getComments).toHaveBeenCalledWith('tp001');
        expect(result.length).toBe(1);
        expect(result[0].travel_plan_id).toBe('tp001');
        expect(result[0].message).toBe('Excited for the trip!');
        });
    });
});
