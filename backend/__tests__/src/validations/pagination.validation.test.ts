import { validatePagination } from '../../../src/validations/validationMiddlewares/pagination.validation.ts';
import { paginationSchema } from '../../../src/validations/schemas/pagination.schema.ts';

describe('Pagination Validation Middleware', () => {
    const mockNext = jest.fn();

    const mockRes = () => {
        const res: any = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should pass with valid page and limit', () => {
        const req: any = {
        query: {
            page: '2',
            limit: '20',
        },
        };
        const res = mockRes();

        validatePagination(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(req.query.page).toBe('2');
        expect(req.query.limit).toBe('20');
        expect(res.status).not.toHaveBeenCalled();
    });

    it('should fail with invalid page (non-numeric)', () => {
        const req: any = {
        query: {
            page: 'abc',
            limit: '10',
        },
        };
        const res = mockRes();

        validatePagination(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Page must be a positive number',
        }));
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should fail with invalid limit (non-numeric)', () => {
        const req: any = {
        query: {
            page: '1',
            limit: 'ten',
        },
        };
        const res = mockRes();

        validatePagination(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Limit must be a positive number',
        }));
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return fallback message when err.errors is undefined', () => {
        const req: any = {
        query: {
            page: '1',
            limit: '10',
        },
        };
        const res = mockRes();

        // Monkey-patch parse to throw a custom error
        const originalParse = paginationSchema.parse;
        paginationSchema.parse = () => {
        throw new Error('Unexpected error');
        };

        validatePagination(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid pagination params' });

        // Restore original parser
        paginationSchema.parse = originalParse;
    });

    it('should assign default "1" to page and "10" to limit when missing in parsed result', () => {
        const req: any = { query: {} };
        const res = mockRes();

        const originalParse = paginationSchema.parse;
        paginationSchema.parse = jest.fn(() => ({
            page: undefined,
            limit: undefined,
        } as any));

        validatePagination(req, res, mockNext);

        expect(req.query.page).toBe('1');
        expect(req.query.limit).toBe('10');
        expect(mockNext).toHaveBeenCalled();

        paginationSchema.parse = originalParse;
    });

});
