
import * as TravelPlanController from '../../../src/controllers/travelplan.controller.ts';
import * as TravelPlanService from '../../../src/services/travelplan.service.ts';
import * as UserService from '../../../src/services/user.service.ts';
// import { mockRequest, mockResponse, mockNext } from '../../utils/mockExpress';
import { AppError } from '../../../src/utils/appError.ts';

jest.mock('../../../src/services/travelplan.service.ts');
jest.mock('../../../src/services/user.service.ts');

export const mockRequest = (data: any = {}) => ({
  ...data,
});

export const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

export const mockNext = () => jest.fn();


const mockUser = { user_id: 'u001', username: 'john' };

describe('TravelPlanController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('craeteTravelPlan', () => {
    it('should create a travel plan', async () => {
      const req = mockRequest({ username: 'john', body: { title: 'Trip' } });
      const res = mockResponse();
      const next = mockNext();

      (UserService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
      (TravelPlanService.craeteTravelPlan as jest.Mock).mockResolvedValue({ travel_plan_id: 'tp001' });

      await TravelPlanController.craeteTravelPlan(req, res, next);

      expect(UserService.getUserByUsername).toHaveBeenCalledWith('john');
      expect(TravelPlanService.craeteTravelPlan).toHaveBeenCalledWith({
        title: 'Trip',
        planner_id: 'u001'
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ travel_plan_id: 'tp001' });
    });

    it('should handle errors', async () => {
      const req = mockRequest({ username: 'john', body: {} });
      const res = mockResponse();
      const next = mockNext();
      const error = new Error('Failed to create');

      (UserService.getUserByUsername as jest.Mock).mockRejectedValue(error);

      await TravelPlanController.craeteTravelPlan(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getTravelPlans', () => {
    it('should return paginated travel plans', async () => {
      const req = mockRequest({ query: { page: '1', limit: '10' } });
      const res = mockResponse();
      const next = mockNext();

      (TravelPlanService.getTravelPlans as jest.Mock).mockResolvedValue(['plan1']);

      await TravelPlanController.getTravelPlans(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(['plan1']);
    });

    it('should handle errors', async () => {
      const req = mockRequest({ query: {} });
      const res = mockResponse();
      const next = mockNext();
      const error = new Error('DB fail');

      (TravelPlanService.getTravelPlans as jest.Mock).mockRejectedValue(error);

      await TravelPlanController.getTravelPlans(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getTravelPlanById', () => {
    it('should return travel plan by ID', async () => {
      const req = mockRequest({ params: { travel_plan_id: 'tp001' } });
      const res = mockResponse();
      const next = mockNext();

      (TravelPlanService.getTravelPlanById as jest.Mock).mockResolvedValue({ travel_plan_id: 'tp001' });

      await TravelPlanController.getTravelPlanById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ travel_plan_id: 'tp001' });
    });

    it('should handle errors', async () => {
      const req = mockRequest({ params: { travel_plan_id: 'tp001' } });
      const res = mockResponse();
      const next = mockNext();
      const error = new Error('Invalid');

      (TravelPlanService.getTravelPlanById as jest.Mock).mockRejectedValue(error);

      await TravelPlanController.getTravelPlanById(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('updateTravelPlanById', () => {
    it('should update a travel plan', async () => {
      const req = mockRequest({
        username: 'john',
        params: { travel_plan_id: 'tp001' },
        body: { title: 'Updated Plan' }
      });
      const res = mockResponse();
      const next = mockNext();

      (UserService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
      (TravelPlanService.updateTravelPlan as jest.Mock).mockResolvedValue('updated');

      await TravelPlanController.updateTravelPlanById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith('updated');
    });

    it('should handle errors', async () => {
      const req = mockRequest({
        username: 'john',
        params: { travel_plan_id: 'tp001' },
        body: {}
      });
      const res = mockResponse();
      const next = mockNext();
      const error = new Error('Fail');

      (UserService.getUserByUsername as jest.Mock).mockRejectedValue(error);

      await TravelPlanController.updateTravelPlanById(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteTravelPlanById', () => {
    it('should delete a travel plan', async () => {
      const req = mockRequest({
        username: 'john',
        params: { travel_plan_id: 'tp001' }
      });
      const res = mockResponse();
      const next = mockNext();

      (UserService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
      (TravelPlanService.deleteTravelPlan as jest.Mock).mockResolvedValue('deleted');

      await TravelPlanController.deleteTravelPlanById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith('deleted');
    });

    it('should handle errors', async () => {
      const req = mockRequest({
        username: 'john',
        params: { travel_plan_id: 'tp001' }
      });
      const res = mockResponse();
      const next = mockNext();
      const error = new Error('Failed');

      (UserService.getUserByUsername as jest.Mock).mockRejectedValue(error);

      await TravelPlanController.deleteTravelPlanById(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getTravelPlanByMemberId', () => {
    it('should return travel plans by member ID', async () => {
      const req = mockRequest({ username: 'john' });
      const res = mockResponse();
      const next = mockNext();

      (UserService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
      (TravelPlanService.getTravelPlansByMemberId as jest.Mock).mockResolvedValue(['tp001']);

      await TravelPlanController.getTravelPlanByMemberId(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(['tp001']);
    });

    it('should handle errors', async () => {
      const req = mockRequest({ username: 'john' });
      const res = mockResponse();
      const next = mockNext();
      const error = new Error('Boom');

      (UserService.getUserByUsername as jest.Mock).mockRejectedValue(error);

      await TravelPlanController.getTravelPlanByMemberId(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
