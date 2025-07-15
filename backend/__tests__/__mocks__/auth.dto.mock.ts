import { AuthDTO } from "../../src/DTOs/auth.dto.ts";

export const mockAuthDTO: AuthDTO = {
    user_id: 'user-123',
    username: 'testuser',
    email: 'test@example.com',
    role: 'user',
    accessToken: 'mockAccessToken',
    refreshToken: 'mockRefreshToken',
};

