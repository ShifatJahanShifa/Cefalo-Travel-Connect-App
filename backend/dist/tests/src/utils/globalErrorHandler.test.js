import { globalErrorHandler } from "../../../src/utils/globalErrorHandler.js";
import { AppError } from "../../../src/utils/appError.js";
describe('globalErrorHandler', () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('should handle AppError with custom status code and message', () => {
        const error = new AppError('Not Found', 404);
        globalErrorHandler(error, req, res, next);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
        expect(console.error).toHaveBeenCalledWith('Global error handler caught:', error);
    });
    it('should handle generic Error with 500 status code', () => {
        const error = new Error('Something went wrong');
        globalErrorHandler(error, req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Something went wrong' });
        expect(console.error).toHaveBeenCalledWith('Global error handler caught:', error);
    });
    it('should fallback to default message if no message is present', () => {
        const error = {};
        globalErrorHandler(error, req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        expect(console.error).toHaveBeenCalledWith('Global error handler caught:', error);
    });
});
