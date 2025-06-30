import { authenticate, authorize, authorizeAdmin } from "../../../src/middlewares/auth.middleware.js";
import * as jwtUtils from "../../../src/utils/jwt.js";
import { Role } from "../../../src/enums/role.js";
jest.mock('../../../src/utils/jwt.ts');
describe('Auth Middleware', () => {
    let req;
    let res;
    let next;
    const mockVerifyAccessToken = jwtUtils.verifyAccessToken;
    beforeEach(() => {
        req = {
            headers: {},
            body: {},
            params: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    describe('authenticate', () => {
        it('should call next if token is valid', () => {
            req.headers = { authorization: 'Bearer valid.token' };
            mockVerifyAccessToken.mockReturnValue({
                username: 'testuser',
                email: 'test@example.com',
                role: Role.TRAVELLER,
            });
            authenticate(req, res, next);
            expect(mockVerifyAccessToken).toHaveBeenCalledWith('valid.token');
            expect(req.username).toBe('testuser');
            expect(req.email).toBe('test@example.com');
            expect(req.role).toBe(Role.TRAVELLER);
            expect(next).toHaveBeenCalled();
        });
        it('should return 401 if authorization header missing', () => {
            req.headers = {};
            authenticate(req, res, next);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith('Cannot access this route');
            expect(next).not.toHaveBeenCalled();
        });
        it('should return 401 if token verification fails', () => {
            req.headers = { authorization: 'Bearer invalid.token' };
            mockVerifyAccessToken.mockImplementation(() => {
                throw new Error('Invalid token');
            });
            authenticate(req, res, next);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith('Unauthorized User');
            expect(next).not.toHaveBeenCalled();
        });
    });
    describe('authorize', () => {
        it('should allow admin to set user role', () => {
            req.role = Role.ADMIN;
            req.body = { role: Role.TRAVELLER };
            req.params = { username: 'otheruser' };
            req.username = 'adminuser';
            authorize(req, res, next);
            expect(next).toHaveBeenCalled();
        });
        it('should forbid non-admin to set user role', () => {
            req.role = Role.TRAVELLER;
            req.body = { role: Role.ADMIN };
            req.params = { username: 'otheruser' };
            req.username = 'someuser';
            authorize(req, res, next);
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ message: "Only admin can set user's role." });
            expect(next).not.toHaveBeenCalled();
        });
        it('should forbid user updating other user profile info except role', () => {
            req.role = Role.TRAVELLER;
            req.body = { bio: 'Updated bio' };
            req.params = { username: 'otheruser' };
            req.username = 'someuser';
            authorize(req, res, next);
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ message: "You can only update your own profile." });
            expect(next).not.toHaveBeenCalled();
        });
        it('should allow user updating their own profile info', () => {
            req.role = Role.TRAVELLER;
            req.body = { bio: 'Updated bio' };
            req.params = { username: 'sameuser' };
            req.username = 'sameuser';
            authorize(req, res, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('authorizeAdmin', () => {
        it('should allow admin to proceed', () => {
            req.role = Role.ADMIN;
            authorizeAdmin(req, res, next);
            expect(next).toHaveBeenCalled();
        });
        it('should forbid non-admin user', () => {
            req.role = Role.TRAVELLER;
            authorizeAdmin(req, res, next);
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized to perform the action" });
            expect(next).not.toHaveBeenCalled();
        });
    });
});
