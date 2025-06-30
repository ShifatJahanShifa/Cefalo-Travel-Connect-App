import { AppError } from "../../../src/utils/appError.js";
describe('AppError', () => {
    it('should create an error with message and statusCode', () => {
        const error = new AppError('my custom error', 400);
        expect(error.message).toBe('my custom error');
        expect(error.statusCode).toBe(400);
    });
    it('should set default status code 500 if not provided', () => {
        const error = new AppError('default error');
        expect(error.statusCode).toBe(500);
    });
    it('should inherit from Error', () => {
        const error = new AppError('Test error');
        expect(error).toBeInstanceOf(Error);
    });
    it('should handle empty message string', () => {
        const error = new AppError('');
        expect(error.message).toBe('');
    });
    it('should use default status code when given undefined', () => {
        const error = new AppError('No code', undefined);
        expect(error.statusCode).toBe(500);
    });
});
