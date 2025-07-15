import * as TravelPlanCommentController from '../../../src/controllers/travelplanmessage.controller.ts';
import * as TravelPlanCommentService from '../../../src/services/travelplancomment.service.ts';

describe('TravelPlanComment Controller', () => {
    let req: any;
    let res: any;
    let next: jest.Mock;

    beforeEach(() => {
        req = {
        body: {},
        params: {},
        username: 'testuser',
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
        jest.clearAllMocks();
    });

    describe('createTravelPlanComment', () => {
        it('should create a travel plan comment and respond with 201', async () => {
            const fakeResult = {
                message_id: 'comment123',
                travel_plan_id: 'plan1',
                sender_id: 'user1',
                message: 'Hello there!',
                created_at: new Date(),
            };

            jest.spyOn(TravelPlanCommentService, 'createTravelPlanComment').mockResolvedValue(fakeResult);

            req.params.travel_plan_id = 'plan1';
            req.body = { sender_id: 'user1', message: 'Hello there!' };

            await TravelPlanCommentController.createTravelPlanComment(req, res, next);

            expect(TravelPlanCommentService.createTravelPlanComment).toHaveBeenCalledWith({
                travel_plan_id: 'plan1',
                sender_id: 'user1',
                message: 'Hello there!',
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(fakeResult);
        });

        it('should call next with error on failure', async () => {
            const error = new Error('fail');
            jest.spyOn(TravelPlanCommentService, 'createTravelPlanComment').mockRejectedValue(error);

            await TravelPlanCommentController.createTravelPlanComment(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getTravelPlanComments', () => {
        it('should get travel plan comments and respond with 200', async () => {
            const fakeResults = [
                { message_id: 'comment1', message: 'Hi' , travel_plan_id: 't1', sender_id: 'user1' },
                { message_id: 'comment2', message: 'Hello', travel_plan_id: 't2', sender_id: 'user2' },
            ];

            jest.spyOn(TravelPlanCommentService, 'getTravelPlanComments').mockResolvedValue(fakeResults);

            req.params.travel_plan_id = 'plan1';

            await TravelPlanCommentController.getTravelPlanComments(req, res, next);

            expect(TravelPlanCommentService.getTravelPlanComments).toHaveBeenCalledWith('plan1');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(fakeResults);
        });

        it('should call next with error on failure', async () => {
            const error = new Error('fail');
            jest.spyOn(TravelPlanCommentService, 'getTravelPlanComments').mockRejectedValue(error);

            await TravelPlanCommentController.getTravelPlanComments(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
