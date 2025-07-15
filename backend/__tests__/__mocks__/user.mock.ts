import { createdUser } from '../../src/types/auth.type.ts';

export const mockCreatedUser: createdUser = {
    user_id: 'test-id-123',
    username: 'testuser',
    email: 'test@example.com',
    hashed_password: 'hashedpw',
    role: 'traveller',
    profile_picture_url: null,
    bio: 'Mock test user',
    created_at: new Date(),
    updated_at: new Date(),
};
