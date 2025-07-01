import {
  createPost,
  getAllPosts,
  getPostByPostID,
  updatePost,
  deletePost,
  getPostsByUserID,
  searchPosts,
  togglePostLike,
} from '../../../src/controllers/post.controller';

import * as PostService from '../../../src/services/post.service';
import * as UserService from '../../../src/services/user.service';

import { ExpressRequest } from '../../../src/middlewares/auth.middleware';
import { PostResponseDTO } from '../../../src/DTOs/post.dto';

jest.mock('../../../src/services/post.service');
jest.mock('../../../src/services/user.service');

describe('Post Controller', () => {
    let req: Partial<ExpressRequest>;
    let res: any;
    let next: jest.Mock;

    const mockUser = {
        user_id: 'user123',
        username: 'john',
    };

    const mockPostDTO = new PostResponseDTO({
        post_id: 'post123',
        user_id: 'user123',
        title: 'Trip to Cox’s Bazar',
        description: 'A fun trip to the beach.',
        total_cost: 10000,
        duration: '3 days',
        effort: 'medium',
        likes_count: 5,
        comments_count: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        accommodations: [{ name: 'Sea Breeze Hotel', cost: 3000 }],
        transports: [{ type: 'bus', cost: 1000 }],
        places: [{ name: 'Laboni Beach' }],
        restaurants: [{ name: 'Mermaid Café' }],
        images: [{ url: 'https://example.com/image1.jpg' }],
        foods: [{ name: 'Grilled Lobster' }],
    });

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
        next = jest.fn();
        jest.clearAllMocks();
    });

    describe('createPost', () => {
        it('should create a post', async () => {
            req.body = { title: 'Trip' };
            (PostService.createPost as jest.Mock).mockResolvedValue(true);

            await createPost(req as any, res, next);
            expect(PostService.createPost).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith(true);
        });

        it('should call next on error', async () => {
            (PostService.createPost as jest.Mock).mockRejectedValue(new Error());
            await createPost(req as any, res, next);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('getAllPosts', () => {
        it('should return all posts', async () => {
            req.query = { page: '1', limit: '5' };
            (PostService.getAllPosts as jest.Mock).mockResolvedValue([mockPostDTO]);

            await getAllPosts(req as any, res, next);
            expect(PostService.getAllPosts).toHaveBeenCalledWith(1, 5);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([mockPostDTO]);
        });

        it('should call next on error', async () => {
            (PostService.getAllPosts as jest.Mock).mockRejectedValue(new Error());
            await getAllPosts(req as any, res, next);
            expect(next).toHaveBeenCalled();
        });

    });

    describe('getPostByPostID', () => {
        it('should return a post by ID', async () => {
            req.params = { post_id: 'post123' };
            (PostService.getPostByPostID as jest.Mock).mockResolvedValue(mockPostDTO);

            await getPostByPostID(req as any, res, next);
            expect(PostService.getPostByPostID).toHaveBeenCalledWith('post123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockPostDTO);
        });

        it('should call next on error', async () => {
            (PostService.getPostByPostID as jest.Mock).mockRejectedValue(new Error());
            await getPostByPostID(req as any, res, next);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('updatePost', () => {
        it('should update a post', async () => {
            req.params = { post_id: 'post123' };
            req.body = { title: 'Updated Title' };
            (PostService.updatePost as jest.Mock).mockResolvedValue('updated');

            await updatePost(req as any, res, next);
            expect(PostService.updatePost).toHaveBeenCalledWith('post123', req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith('updated');
        });

        it('should call next on error', async () => {
            (PostService.updatePost as jest.Mock).mockRejectedValue(new Error());
            await updatePost(req as any, res, next);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('deletePost', () => {
        it('should delete a post', async () => {
            req.params = { post_id: 'post123' };
            req.username = 'john';
            (UserService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
            (PostService.deletePost as jest.Mock).mockResolvedValue('deleted');

            await deletePost(req as any, res, next);
            expect(UserService.getUserByUsername).toHaveBeenCalledWith('john');
            expect(PostService.deletePost).toHaveBeenCalledWith('post123', 'user123');
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalledWith('deleted');
        });

        it('should call next on error', async () => {
            (UserService.getUserByUsername as jest.Mock).mockRejectedValue(new Error());
            await deletePost(req as any, res, next);
            expect(next).toHaveBeenCalled();
        });

    });

    describe('getPostsByUserID', () => {
        it('should get posts by username', async () => {
            req.params = { username: 'john' };
            (UserService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
            (PostService.getPostsByUserID as jest.Mock).mockResolvedValue([mockPostDTO]);

            await getPostsByUserID(req as any, res, next);
            expect(PostService.getPostsByUserID).toHaveBeenCalledWith('user123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([mockPostDTO]);
        });

        it('should call next on error', async () => {
            (UserService.getUserByUsername as jest.Mock).mockRejectedValue(new Error());
            await getPostsByUserID(req as any, res, next);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('searchPosts', () => {
        it('should search posts with filters', async () => {
            req.query = {
                title: 'Trip',
                min_cost: '100',
                max_cost: '1000',
                transport_type: 'bus',
                place_name: 'Beach',
                restaurant_name: 'Café',
                accommodation_type: 'hotel',
            };

            (PostService.searchPosts as jest.Mock).mockResolvedValue([mockPostDTO]);

            await searchPosts(req as any, res, next);
            expect(PostService.searchPosts).toHaveBeenCalledWith({
                title: 'Trip',
                min_cost: 100,
                max_cost: 1000,
                transport_type: 'bus',
                place_name: 'Beach',
                restaurant_name: 'Café',
                accommodation_type: 'hotel',
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([mockPostDTO]);
        });

        it('should call next on error', async () => {
            (PostService.searchPosts as jest.Mock).mockRejectedValue(new Error());
            await searchPosts(req as any, res, next);
            expect(next).toHaveBeenCalled();
        });


        it('should handle missing min_cost and max_cost (undefined case)', async () => {
            req.query = {
                title: 'Trip',
                transport_type: 'bus',
                place_name: 'Beach',
                restaurant_name: 'Café',
                accommodation_type: 'hotel',
                
            };

            (PostService.searchPosts as jest.Mock).mockResolvedValue([mockPostDTO]);

            await searchPosts(req as any, res, next);

            expect(PostService.searchPosts).toHaveBeenCalledWith({
                title: 'Trip',
                min_cost: undefined,
                max_cost: undefined,
                transport_type: 'bus',
                place_name: 'Beach',
                restaurant_name: 'Café',
                accommodation_type: 'hotel',
            });

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([mockPostDTO]);
        });

    });

    describe('togglePostLike', () => {
        it('should toggle like on a post', async () => {
            req.params = { postId: 'post123' };
            req.username = 'john';
            (UserService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
            (PostService.togglePostLike as jest.Mock).mockResolvedValue('liked');

            await togglePostLike(req as any, res, next);
            expect(PostService.togglePostLike).toHaveBeenCalledWith('post123', 'user123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith('liked');
        });

        it('should call next on error', async () => {
            (UserService.getUserByUsername as jest.Mock).mockRejectedValue(new Error());
            await togglePostLike(req as any, res, next);
            expect(next).toHaveBeenCalled();
        });
    });
});
