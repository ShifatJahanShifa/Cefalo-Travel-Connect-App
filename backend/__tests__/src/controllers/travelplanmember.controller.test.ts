import * as TravelPlanMemberController from '../../../src/controllers/travelplanmember.controller.ts';
import * as TravelPlanMemberService from '../../../src//services/travelplanmember.service.ts';
import * as UserService from '../../../src/services/user.service.ts';
import { TravelPlanResponseDTO } from '../../../src/DTOs/travelplan.dto.ts';
import { TravelPlanMemberDTO } from '../../../src/DTOs/travelplanmember.dto.ts';

describe('TravelPlanMember Controller', () => {
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

    describe('addTravelPlanMember', () => {
        it('should add travel plan member and respond with 201', async () => {
            const fakeResult = new TravelPlanMemberDTO({
                user_id: 'user123',
                username: 'testuser',
                email: 'testuser@example.com',
                role: 'admin',
                });

            jest.spyOn(TravelPlanMemberService, 'addTravelPlanMember').mockResolvedValue(fakeResult);

            req.body = { user_id: 'user1', travel_plan_id: 'plan1', role: 'member' };

            await TravelPlanMemberController.addTravelPlanMember(req, res, next);

            expect(TravelPlanMemberService.addTravelPlanMember).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(fakeResult);
        });

        it('should call next with error on failure', async () => {
            const error = new Error('fail');
            jest.spyOn(TravelPlanMemberService, 'addTravelPlanMember').mockRejectedValue(error);

            await TravelPlanMemberController.addTravelPlanMember(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getTravelPlanMemmebrs', () => {
        it('should get travel plan members and respond with 200', async () => {

            const fakeResults = [new TravelPlanMemberDTO({
                user_id: 'user123',
                username: 'testuser',
                email: 'testuser@example.com',
                role: 'admin',
                })];
            jest.spyOn(TravelPlanMemberService, 'getTravelPlanMemmebrs').mockResolvedValue(fakeResults);

            req.params.travel_plan_id = 'plan1';

            await TravelPlanMemberController.getTravelPlanMemmebrs(req, res, next);

            expect(TravelPlanMemberService.getTravelPlanMemmebrs).toHaveBeenCalledWith('plan1');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(fakeResults);
        });

        it('should call next with error on failure', async () => {
            const error = new Error('fail');
            jest.spyOn(TravelPlanMemberService, 'getTravelPlanMemmebrs').mockRejectedValue(error);

            await TravelPlanMemberController.getTravelPlanMemmebrs(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('updateTravelPlanMemberRole', () => {
        it('should update role and respond with 200', async () => {
            
            const fakeUser = { user_id: 'user123',  
            username: 'john',
            email: 'john@example.com',
            role: 'traveller',
            profile_picture_url: null,
            bio: null };

            const fakeResult = new TravelPlanMemberDTO({
            user_id: 'user123',
            username: 'testuser',
            email: 'testuser@example.com',
            role: 'admin',
            });



            jest.spyOn(UserService, 'getUserByUsername').mockResolvedValue(fakeUser);
            jest.spyOn(TravelPlanMemberService, 'updateTravelPlanMemberRole').mockResolvedValue(fakeResult);

            req.username = 'testuser';
            req.params.travel_plan_id = 'plan1';
            req.body = { user_id: 'user1', role: 'admin' };

            await TravelPlanMemberController.updateTravelPlanMemberRole(req, res, next);

            expect(UserService.getUserByUsername).toHaveBeenCalledWith('testuser');
            expect(TravelPlanMemberService.updateTravelPlanMemberRole).toHaveBeenCalledWith({
                user_id: 'user1',
                travel_plan_id: 'plan1',
                role: 'admin',
            }, 'user123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(fakeResult);
        });

        it('should call next with error on failure', async () => {
            const error = new Error('fail');
            jest.spyOn(UserService, 'getUserByUsername').mockRejectedValue(error);

            req.username = 'testuser';
            req.params.travel_plan_id = 'plan1';
            req.body = { user_id: 'user1', role: 'admin' };

            await TravelPlanMemberController.updateTravelPlanMemberRole(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
