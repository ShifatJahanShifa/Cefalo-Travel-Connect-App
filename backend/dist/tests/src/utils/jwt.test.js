import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "../../../src/utils/jwt.js";
import { mockCreatedUser } from "../../__mocks__/user.mock.js";
import jwt from 'jsonwebtoken';
describe('JWT Utility Functions', () => {
    beforeAll(() => {
        process.env.ACCESS_TOKEN_SECRET = 'access-secret-test';
        process.env.REFRESH_TOKEN_SECRET = 'refresh-secret-test';
    });
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.useRealTimers();
        jest.clearAllTimers();
    });
    describe('generateAccessToken', () => {
        it('should generate a valid JWT access token', () => {
            const token = generateAccessToken(mockCreatedUser);
            expect(typeof token).toBe('string');
            const decoded = jwt.decode(token);
            expect(decoded?.username).toBe(mockCreatedUser.username);
            expect(decoded?.email).toBe(mockCreatedUser.email);
            expect(decoded?.role).toBe(mockCreatedUser.role);
        });
    });
    describe('generateRefreshToken', () => {
        it('should generate a valid JWT refresh token', () => {
            const token = generateRefreshToken(mockCreatedUser);
            expect(typeof token).toBe('string');
            const decoded = jwt.decode(token);
            expect(decoded.email).toBe(mockCreatedUser.email);
        });
    });
    describe('verifyAccessToken', () => {
        it('should throw if access token is invalid', () => {
            expect(() => verifyAccessToken('invalid.token')).toThrow();
        });
        it('should throw if access token is expired', () => {
            const token = jwt.sign({
                username: mockCreatedUser.username,
                email: mockCreatedUser.email,
                role: mockCreatedUser.role,
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1s' });
            jest.advanceTimersByTime(2000);
            expect(() => verifyAccessToken(token)).toThrow(/jwt expired/i);
        });
    });
    describe('verifyRefreshToken', () => {
        it('should throw if refresh token is invalid', () => {
            expect(() => verifyRefreshToken('invalid.token')).toThrow();
        });
        it('should throw if refresh token is expired', () => {
            const token = jwt.sign({ email: mockCreatedUser.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1s' });
            jest.advanceTimersByTime(2000);
            expect(() => verifyRefreshToken(token)).toThrow(/jwt expired/i);
        });
    });
});
