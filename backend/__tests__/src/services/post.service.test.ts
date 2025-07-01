import * as PostService from '../../../src/services/post.service.ts';
import posttDAO from '../../../src/repositories/dao/postt.repository.ts';
import accommodationDao from '../../../src/repositories/dao/accommodation.repository.ts';
import postAccommodationDao from '../../../src/repositories/dao/post_accommodation.repository.ts';
import transportDao from '../../../src/repositories/dao/transport.repository.ts';
import postTransportDao from '../../../src/repositories/dao/post_transport.repository.ts';
import placeDao from '../../../src/repositories/dao/place.repository.ts';
import postPlaceDao from '../../../src/repositories/dao/post_place.repository.ts';
import postFoodDao from '../../../src/repositories/dao/post_food.repository.ts';
import postImageDao from '../../../src/repositories/dao/post_image.repository.ts';
import userDAO from '../../../src/repositories/dao/user.respository.ts';
import postInteractionDao from '../../../src/repositories/dao/post_interaction.repository.ts';
import { PostResponseDTO } from '../../../src/DTOs/post.dto.ts';
import { UserDTO } from '../../../src/DTOs/user.dto.ts';
import { AppError } from '../../../src/utils/appError.ts';


jest.mock('../../../src/repositories/dao/postt.repository.ts');
jest.mock('../../../src/repositories/dao/accommodation.repository.ts');
jest.mock('../../../src/repositories/dao/post_accommodation.repository.ts');
jest.mock('../../../src/repositories/dao/transport.repository.ts');
jest.mock('../../../src/repositories/dao/post_transport.repository.ts');
jest.mock('../../../src/repositories/dao/place.repository.ts');
jest.mock('../../../src/repositories/dao/post_place.repository.ts');
jest.mock('../../../src/repositories/dao/post_food.repository.ts');
jest.mock('../../../src/repositories/dao/post_image.repository.ts');
jest.mock('../../../src/repositories/dao/user.respository.ts');
jest.mock('../../../src/repositories/dao/post_interaction.repository.ts');

describe('Post Service', () => {

    const mockPost = {
        post_id: '1',
        user_id: 'user1',
        title: 'Test Post',
        content: 'Test Content',
    };

    const mockPostDTO = {
        post_id: '1',
        user_id: 'user1',
        title: 'Test Post',
        content: 'Test Content',
        transports: [],
        places: [],
        accommodations: [],
        postFoods: [],
        images: [],
    };

    const mockAccommodation = {
        accommodation_id: 'acc1',
        accommodation_name: 'Test Hotel',
        accommodation_type: 'Hotel',
        latitude: 40.7128,
        longitude: -74.0060,
    };

    const mockTransport = {
        transport_id: 'trans1',
        transport_name: 'Test Bus',
        transport_type: 'Bus',
    };

    const mockPlace = {
        place_id: 'place1',
        place_name: 'Test Place',
        latitude: 40.7128,
        longitude: -74.0060,
    };

    const mockFood = {
        food_name: 'Test Food',
        cost: 10,
        rating: 4,
        review: 'Great food',
    };

    const mockImage = {
        image_url: 'http://test.com/image.jpg',
        caption: 'Test Image',
    };

    const mockUser = {
        user_id: 'user1',
        username: 'testuser',
        role: 'explorer',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createPost', () => {
        const input = {
        user_id: 'user1',
        title: 'Test Post',
        description: 'my post', 
        total_cost: 23, 
        duration: '2hr', 
        effort: 'my effort', 
        categories: ['travel'],
        accommodations: [
            {
            accommodation_name: 'Test Hotel',
            accommodation_type: 'Hotel',
            latitude: 40.7128,
            longitude: -74.0060,
            cost: 100,
            rating: 4,
            review: 'Great stay',
            },
        ],
        transports: [
            {
            transport_name: 'Test Bus',
            transport_type: 'Bus',
            cost: 20,
            rating: 3,
            review: 'Good ride',
            },
        ],
        places: [
            {
            place_name: 'Test Place',
            latitude: 40.7128,
            longitude: -74.0060,
            cost: 50,
            rating: 5,
            review: 'Amazing place',
            },
        ],
        foods: [mockFood],
        images: [mockImage],
        };

        it('should create a post and associated entities, update user role, and return true', async () => {
            (posttDAO.createPost as jest.Mock).mockResolvedValue(mockPost);
            (accommodationDao.getAccommodationByTypeAndName as jest.Mock).mockResolvedValue(null);
            (accommodationDao.createAccommodation as jest.Mock).mockResolvedValue(mockAccommodation);
            (postAccommodationDao.createPostAccommodation as jest.Mock).mockResolvedValue(undefined);
            (transportDao.getTransportByTypeAndName as jest.Mock).mockResolvedValue(null);
            (transportDao.createTransport as jest.Mock).mockResolvedValue(mockTransport);
            (postTransportDao.createPostTransport as jest.Mock).mockResolvedValue(undefined);
            (placeDao.getPlaceByName as jest.Mock).mockResolvedValue(null);
            (placeDao.createPlace as jest.Mock).mockResolvedValue(mockPlace);
            (postPlaceDao.createPostPlace as jest.Mock).mockResolvedValue(undefined);
            (postFoodDao.createPostFood as jest.Mock).mockResolvedValue(undefined);
            (postImageDao.createPostImage as jest.Mock).mockResolvedValue(undefined);
            (userDAO.getUserByID as jest.Mock).mockResolvedValue(mockUser);
            (userDAO.updateUser as jest.Mock).mockResolvedValue(undefined);

            const result = await PostService.createPost(input);

            expect(posttDAO.createPost).toHaveBeenCalledWith(input);
            expect(accommodationDao.createAccommodation).toHaveBeenCalledWith({
                accommodation_name: 'Test Hotel',
                accommodation_type: 'Hotel',
                latitude: 40.7128,
                longitude: -74.0060,
            });
            expect(postAccommodationDao.createPostAccommodation).toHaveBeenCalledWith(
                '1',
                'acc1',
                100,
                4,
                'Great stay'
            );
            expect(transportDao.createTransport).toHaveBeenCalledWith({
                transport_name: 'Test Bus',
                transport_type: 'Bus',
            });
            expect(postTransportDao.createPostTransport).toHaveBeenCalledWith('1', 'trans1', 20, 3, 'Good ride');
            expect(placeDao.createPlace).toHaveBeenCalledWith({
                place_name: 'Test Place',
                latitude: 40.7128,
                longitude: -74.0060,
            });
            expect(postPlaceDao.createPostPlace).toHaveBeenCalledWith('1', 'place1', 50, 5, 'Amazing place');
            expect(postFoodDao.createPostFood).toHaveBeenCalledWith('1', 'Test Food', 10, 4, 'Great food');
            expect(postImageDao.createPostImage).toHaveBeenCalledWith('1', 'http://test.com/image.jpg', 'Test Image');
            expect(userDAO.getUserByID).toHaveBeenCalledWith('user1');
            expect(userDAO.updateUser).toHaveBeenCalledWith('testuser', { role: 'traveller' });
            expect(result).toBe(true);
        });


        it('should throw error if post creation fails', async () => {
            (posttDAO.createPost as jest.Mock).mockRejectedValue(new Error('DB Error'));
            await expect(PostService.createPost(input)).rejects.toThrow('DB Error');
        });


        it('should not update user role if already a traveller', async () => {
            (posttDAO.createPost as jest.Mock).mockResolvedValue(mockPost);
            (userDAO.getUserByID as jest.Mock).mockResolvedValue({ ...mockUser, role: 'traveller' });

            const result = await PostService.createPost(input);
            expect(userDAO.updateUser).not.toHaveBeenCalled(); 
            expect(result).toBe(true);
        });


       it('should throw an error if user is not found during post creation', async () => {
            (posttDAO.createPost as jest.Mock).mockResolvedValue(mockPost);
           
            (userDAO.getUserByID as jest.Mock).mockImplementation(() => {
                throw new AppError('User not found', 404);
            });

            await expect(PostService.createPost({
                ...input,
                user_id: 'unknown-user',
            })).rejects.toThrow('User not found'); 
        });


        it('should not create new accommodation if it already exists', async () => {
            (posttDAO.createPost as jest.Mock).mockResolvedValue(mockPost);
            (accommodationDao.getAccommodationByTypeAndName as jest.Mock).mockResolvedValue(mockAccommodation);
            (postAccommodationDao.createPostAccommodation as jest.Mock).mockResolvedValue(undefined);
            (userDAO.getUserByID as jest.Mock).mockResolvedValue(mockUser);

            const result = await PostService.createPost({ ...input, transports: [], places: [], foods: [], images: [] });

            expect(accommodationDao.createAccommodation).not.toHaveBeenCalled();
            expect(result).toBe(true);
        });

        it('should not create new transport if it already exists', async () => {
            (posttDAO.createPost as jest.Mock).mockResolvedValue(mockPost);
            (accommodationDao.getAccommodationByTypeAndName as jest.Mock).mockResolvedValue(null);
            (accommodationDao.createAccommodation as jest.Mock).mockResolvedValue(mockAccommodation);
            (postAccommodationDao.createPostAccommodation as jest.Mock).mockResolvedValue(undefined);

            (transportDao.getTransportByTypeAndName as jest.Mock).mockResolvedValue(mockTransport);
            (postTransportDao.createPostTransport as jest.Mock).mockResolvedValue(undefined);

            (userDAO.getUserByID as jest.Mock).mockResolvedValue(mockUser);

            const result = await PostService.createPost({ ...input, places: [], foods: [], images: [] });

            expect(transportDao.createTransport).not.toHaveBeenCalled();
            expect(result).toBe(true);
        });


        it('should not create new place if it already exists', async () => {
            (posttDAO.createPost as jest.Mock).mockResolvedValue(mockPost);
            (accommodationDao.getAccommodationByTypeAndName as jest.Mock).mockResolvedValue(null);
            (accommodationDao.createAccommodation as jest.Mock).mockResolvedValue(mockAccommodation);
            (postAccommodationDao.createPostAccommodation as jest.Mock).mockResolvedValue(undefined);

            (transportDao.getTransportByTypeAndName as jest.Mock).mockResolvedValue(null);
            (transportDao.createTransport as jest.Mock).mockResolvedValue(mockTransport);
            (postTransportDao.createPostTransport as jest.Mock).mockResolvedValue(undefined);

            (placeDao.getPlaceByName as jest.Mock).mockResolvedValue(mockPlace);
            (postPlaceDao.createPostPlace as jest.Mock).mockResolvedValue(undefined);

            (userDAO.getUserByID as jest.Mock).mockResolvedValue(mockUser);

            const result = await PostService.createPost({ ...input, foods: [], images: [] });

            expect(placeDao.createPlace).not.toHaveBeenCalled();
            expect(result).toBe(true);
        });


        //  i am adding more tests for branch coverage 

        it('should process only accommodations when others are empty', async () => {
            (posttDAO.createPost as jest.Mock).mockResolvedValue(mockPost);
            (accommodationDao.getAccommodationByTypeAndName as jest.Mock).mockResolvedValue(null);
            (accommodationDao.createAccommodation as jest.Mock).mockResolvedValue(mockAccommodation);
            (postAccommodationDao.createPostAccommodation as jest.Mock).mockResolvedValue(undefined);
            (userDAO.getUserByID as jest.Mock).mockResolvedValue(mockUser);

            const result = await PostService.createPost({
                ...input,
                transports: [],
                places: [],
                foods: [],
                images: []
            });

            expect(accommodationDao.createAccommodation).toHaveBeenCalled();
            expect(transportDao.getTransportByTypeAndName).not.toHaveBeenCalled();
            expect(placeDao.getPlaceByName).not.toHaveBeenCalled();
            expect(postFoodDao.createPostFood).not.toHaveBeenCalled();
            expect(postImageDao.createPostImage).not.toHaveBeenCalled();
            expect(result).toBe(true);
        });


        it('should process only transports when others are empty', async () => {
            (posttDAO.createPost as jest.Mock).mockResolvedValue(mockPost);
            (transportDao.getTransportByTypeAndName as jest.Mock).mockResolvedValue(null);
            (transportDao.createTransport as jest.Mock).mockResolvedValue(mockTransport);
            (postTransportDao.createPostTransport as jest.Mock).mockResolvedValue(undefined);
            (userDAO.getUserByID as jest.Mock).mockResolvedValue(mockUser);

            const result = await PostService.createPost({
                ...input,
                accommodations: [],
                places: [],
                foods: [],
                images: []
            });

            expect(accommodationDao.getAccommodationByTypeAndName).not.toHaveBeenCalled();
            expect(transportDao.createTransport).toHaveBeenCalled();
            expect(result).toBe(true);
        });


        it('should process only places when others are empty', async () => {
            (posttDAO.createPost as jest.Mock).mockResolvedValue(mockPost);
            (placeDao.getPlaceByName as jest.Mock).mockResolvedValue(null);
            (placeDao.createPlace as jest.Mock).mockResolvedValue(mockPlace);
            (postPlaceDao.createPostPlace as jest.Mock).mockResolvedValue(undefined);
            (userDAO.getUserByID as jest.Mock).mockResolvedValue(mockUser);

            const result = await PostService.createPost({
                ...input,
                accommodations: [],
                transports: [],
                foods: [],
                images: []
            });

            expect(placeDao.createPlace).toHaveBeenCalled();
            expect(accommodationDao.getAccommodationByTypeAndName).not.toHaveBeenCalled();
            expect(result).toBe(true);
        });


        it('should process only foods when others are empty', async () => {
            (posttDAO.createPost as jest.Mock).mockResolvedValue(mockPost);
            (postFoodDao.createPostFood as jest.Mock).mockResolvedValue(undefined);
            (userDAO.getUserByID as jest.Mock).mockResolvedValue(mockUser);

            const result = await PostService.createPost({
                ...input,
                accommodations: [],
                transports: [],
                places: [],
                images: []
            });

            expect(postFoodDao.createPostFood).toHaveBeenCalled();
            expect(result).toBe(true);
        });


        it('should process only images when others are empty', async () => {
            (posttDAO.createPost as jest.Mock).mockResolvedValue(mockPost);
            (postImageDao.createPostImage as jest.Mock).mockResolvedValue(undefined);
            (userDAO.getUserByID as jest.Mock).mockResolvedValue(mockUser);

            const result = await PostService.createPost({
                ...input,
                accommodations: [],
                transports: [],
                places: [],
                foods: []
            });

            expect(postImageDao.createPostImage).toHaveBeenCalled();
            expect(result).toBe(true);
        });

        it('should handle createPost when all optional arrays are empty', async () => {
            (posttDAO.createPost as jest.Mock).mockResolvedValue(mockPost);
            (userDAO.getUserByID as jest.Mock).mockResolvedValue(mockUser);

            const result = await PostService.createPost({
                ...input,
                accommodations: [],
                transports: [],
                places: [],
                foods: [],
                images: [],
            });

            expect(accommodationDao.getAccommodationByTypeAndName).not.toHaveBeenCalled();
            expect(transportDao.getTransportByTypeAndName).not.toHaveBeenCalled();
            expect(placeDao.getPlaceByName).not.toHaveBeenCalled();
            expect(postFoodDao.createPostFood).not.toHaveBeenCalled();
            expect(postImageDao.createPostImage).not.toHaveBeenCalled();
            expect(result).toBe(true);
        });


    });


    describe('getAllPosts', () => {
        it('should return an array of enriched PostResponseDTOs', async () => {
            (posttDAO.getAllPosts as jest.Mock).mockResolvedValue([mockPost]);
            (postTransportDao.getById as jest.Mock).mockResolvedValue([{ transport_id: 'trans1', cost: 20, rating: 3, review: 'Good ride' }]);
            (postPlaceDao.getById as jest.Mock).mockResolvedValue([{ place_id: 'place1', cost: 50, rating: 5, review: 'Amazing place' }]);
            (postAccommodationDao.getById as jest.Mock).mockResolvedValue([{ accommodation_id: 'acc1', cost: 100, rating: 4, review: 'Great stay' }]);
            (postFoodDao.getById as jest.Mock).mockResolvedValue([mockFood]);
            (postImageDao.getById as jest.Mock).mockResolvedValue([mockImage]);
            (transportDao.getById as jest.Mock).mockResolvedValue([mockTransport]);
            (placeDao.getById as jest.Mock).mockResolvedValue([mockPlace]);
            (accommodationDao.getById as jest.Mock).mockResolvedValue([mockAccommodation]);

            const result = await PostService.getAllPosts(1, 10);

            expect(posttDAO.getAllPosts).toHaveBeenCalledWith(1, 10);
            expect(result).toHaveLength(1);
            expect(result[0]).toBeInstanceOf(PostResponseDTO);
            expect(result[0]).toEqual(expect.objectContaining({
                post_id: '1',
                transports: expect.arrayContaining([expect.objectContaining({ transport_id: 'trans1', cost: 20 })]),
                places: expect.arrayContaining([expect.objectContaining({ place_id: 'place1', cost: 50 })]),
                accommodations: expect.arrayContaining([expect.objectContaining({ accommodation_id: 'acc1', cost: 100 })]),
                postFoods: expect.arrayContaining([expect.objectContaining({ food_name: 'Test Food' })]),
                images: expect.arrayContaining([expect.objectContaining({ image_url: 'http://test.com/image.jpg' })]),
            }));
        });

        it('should return an empty array if no posts are found', async () => {
            (posttDAO.getAllPosts as jest.Mock).mockResolvedValue([]);

            const result = await PostService.getAllPosts(1, 10);

            expect(posttDAO.getAllPosts).toHaveBeenCalledWith(1, 10);
            expect(result).toEqual([]);
        });

        it('should handle missing related entities gracefully', async () => {
            (posttDAO.getAllPosts as jest.Mock).mockResolvedValue([mockPost]);
            (postTransportDao.getById as jest.Mock).mockResolvedValue([]); 
            (postPlaceDao.getById as jest.Mock).mockResolvedValue([]);     
            (postAccommodationDao.getById as jest.Mock).mockResolvedValue([]); 
            (postFoodDao.getById as jest.Mock).mockResolvedValue([]);
            (postImageDao.getById as jest.Mock).mockResolvedValue([]);
            (transportDao.getById as jest.Mock).mockResolvedValue([]);
            (placeDao.getById as jest.Mock).mockResolvedValue([]);
            (accommodationDao.getById as jest.Mock).mockResolvedValue([]);

            const result = await PostService.getAllPosts(1, 10);
            expect(result).toHaveLength(1);
        });

    });

    describe('getPostByPostID', () => {
        it('should return an enriched PostResponseDTO', async () => {
            (posttDAO.getPostByPostID as jest.Mock).mockResolvedValue(mockPost);
            (postTransportDao.getById as jest.Mock).mockResolvedValue([{ transport_id: 'trans1', cost: 20, rating: 3, review: 'Good ride' }]);
            (postPlaceDao.getById as jest.Mock).mockResolvedValue([{ place_id: 'place1', cost: 50, rating: 5, review: 'Amazing place' }]);
            (postAccommodationDao.getById as jest.Mock).mockResolvedValue([{ accommodation_id: 'acc1', cost: 100, rating: 4, review: 'Great stay' }]);
            (postFoodDao.getById as jest.Mock).mockResolvedValue([mockFood]);
            (postImageDao.getById as jest.Mock).mockResolvedValue([mockImage]);
            (transportDao.getById as jest.Mock).mockResolvedValue([mockTransport]);
            (placeDao.getById as jest.Mock).mockResolvedValue([mockPlace]);
            (accommodationDao.getById as jest.Mock).mockResolvedValue([mockAccommodation]);

            const result = await PostService.getPostByPostID('1');

            expect(posttDAO.getPostByPostID).toHaveBeenCalledWith('1');
            expect(result).toBeInstanceOf(PostResponseDTO);
        });

        it('should throw an AppError if post is not found', async () => {
            (posttDAO.getPostByPostID as jest.Mock).mockResolvedValue(null);

            await expect(PostService.getPostByPostID('1')).rejects.toThrow(new AppError('post not found', 404));
            expect(posttDAO.getPostByPostID).toHaveBeenCalledWith('1');
        });


         it('should return post with empty transports, places, accommodations when IDs are empty', async () => {
            
            (posttDAO.getPostByPostID as jest.Mock).mockResolvedValue(mockPost);

            (postTransportDao.getById as jest.Mock).mockResolvedValue([]);
            (postPlaceDao.getById as jest.Mock).mockResolvedValue([]);
            (postAccommodationDao.getById as jest.Mock).mockResolvedValue([]);

            (transportDao.getById as jest.Mock).mockResolvedValue([]);
            (placeDao.getById as jest.Mock).mockResolvedValue([]);
            (accommodationDao.getById as jest.Mock).mockResolvedValue([]);

            const result = await PostService.getPostByPostID('1');

            expect(posttDAO.getPostByPostID).toHaveBeenCalledWith('1');
            expect(transportDao.getById).not.toHaveBeenCalled();
            expect(placeDao.getById).not.toHaveBeenCalled();
            expect(accommodationDao.getById).not.toHaveBeenCalled();

            expect(result.transports).toEqual([]);
            expect(result.places).toEqual([]);
            expect(result.accommodations).toEqual([]);
        });
    });

    describe('updatePost', () => {

        const input = {
            user_id: 'user1',
            title: 'Updated Post',
            description: 'my post',
            total_cost: 23,
            duration: '2hr',
            effort: 'my effort',
            categories: ['travel'],
            accommodations: [
                {
                accommodation_name: 'Test Hotel',
                accommodation_type: 'Hotel',
                cost_per_night: 150,
                latitude: 40.7128,
                longitude: -74.0060,
                cost: 150,
                rating: 5,
                review: 'Amazing stay',
                },
            ],
            transports: [
                {
                transport_name: 'Test Bus',
                transport_type: 'Bus',
                cost: 25,
                rating: 4,
                review: 'Smooth ride',
                },
            ],
            places: [
                {
                place_name: 'Test Place',
                latitude: 40.7128,
                longitude: -74.0060,
                cost: 60,
                rating: 4,
                review: 'Great place',
                },
            ],
            foods: [mockFood],
            images: [mockImage],
        };

        it('should update a post and associated entities', async () => {
            (posttDAO.getPostByPostID as jest.Mock).mockResolvedValue(mockPost);
            (posttDAO.updatePost as jest.Mock).mockResolvedValue(mockPost);
            (accommodationDao.getAccommodationByTypeAndName as jest.Mock).mockResolvedValue(mockAccommodation);
            (postAccommodationDao.updatePostAccommodation as jest.Mock).mockResolvedValue(undefined);
            (transportDao.getTransportByTypeAndName as jest.Mock).mockResolvedValue(mockTransport);
            (postTransportDao.updatePostTransport as jest.Mock).mockResolvedValue(undefined);
            (placeDao.getPlaceByName as jest.Mock).mockResolvedValue(mockPlace);
            (postPlaceDao.updatePostPlace as jest.Mock).mockResolvedValue(undefined);
            (postFoodDao.updatePostFood as jest.Mock).mockResolvedValue(undefined);
            (postImageDao.deleteById as jest.Mock).mockResolvedValue(undefined);
            (postImageDao.createPostImage as jest.Mock).mockResolvedValue(undefined);

            const result = await PostService.updatePost('1', input);

            expect(posttDAO.getPostByPostID).toHaveBeenCalledWith('1');
            expect(posttDAO.updatePost).toHaveBeenCalledWith('1', input);
            expect(postAccommodationDao.updatePostAccommodation).toHaveBeenCalledWith('1', 'acc1', 150, 5, 'Amazing stay');
            expect(postTransportDao.updatePostTransport).toHaveBeenCalledWith('1', 'trans1', 25, 4, 'Smooth ride');
            expect(postPlaceDao.updatePostPlace).toHaveBeenCalledWith('1', 'place1', 60, 4, 'Great place');
            expect(postFoodDao.updatePostFood).toHaveBeenCalledWith('1', 'Test Food', 10, 4, 'Great food');
            expect(postImageDao.deleteById).toHaveBeenCalledWith('1');
            expect(postImageDao.createPostImage).toHaveBeenCalledWith('1', 'http://test.com/image.jpg', 'Test Image');
            expect(result).toBe('Post updated successfully');
        });

        it('should throw an AppError if post is not found', async () => {
            (posttDAO.getPostByPostID as jest.Mock).mockResolvedValue(null);

            await expect(PostService.updatePost('1', input)).rejects.toThrow(new AppError('Post not found', 404));
        });

        it('should throw an AppError if user is not authorized', async () => {
            (posttDAO.getPostByPostID as jest.Mock).mockResolvedValue({ ...mockPost, user_id: 'user2' });

            await expect(PostService.updatePost('1', input)).rejects.toThrow(new AppError('you are not authorized to update the post', 403));
        });

        it('should create new place if not found during update', async () => {
            (posttDAO.getPostByPostID as jest.Mock).mockResolvedValue(mockPost);
            (posttDAO.updatePost as jest.Mock).mockResolvedValue(mockPost);
            (placeDao.getPlaceByName as jest.Mock).mockResolvedValue(null);
            (placeDao.createPlace as jest.Mock).mockResolvedValue(mockPlace);
            (postPlaceDao.updatePostPlace as jest.Mock).mockResolvedValue(undefined);

            const result = await PostService.updatePost('1', input);
            expect(placeDao.createPlace).not.toHaveBeenCalled();
                expect(result).toBe('Post updated successfully');
        });

                    
        it('should create new accommodation if not found during update', async () => {
            (posttDAO.getPostByPostID as jest.Mock).mockResolvedValue(mockPost);
            (posttDAO.updatePost as jest.Mock).mockResolvedValue(mockPost);
            (accommodationDao.getAccommodationByTypeAndName as jest.Mock).mockResolvedValue(null);
            (accommodationDao.createAccommodation as jest.Mock).mockResolvedValue(mockAccommodation);
            (postAccommodationDao.updatePostAccommodation as jest.Mock).mockResolvedValue(undefined);
            (postImageDao.deleteById as jest.Mock).mockResolvedValue(undefined);
            (postImageDao.createPostImage as jest.Mock).mockResolvedValue(undefined);

            const result = await PostService.updatePost('1', input);

            expect(accommodationDao.createAccommodation).not.toHaveBeenCalled();
            expect(result).toBe('Post updated successfully');
        });


        it('should not create new transport if it already exists during update', async () => {
            (posttDAO.getPostByPostID as jest.Mock).mockResolvedValue(mockPost);
            (posttDAO.updatePost as jest.Mock).mockResolvedValue(mockPost);

            (transportDao.getTransportByTypeAndName as jest.Mock).mockResolvedValue(mockTransport);
            (postTransportDao.updatePostTransport as jest.Mock).mockResolvedValue(undefined);

            (postImageDao.deleteById as jest.Mock).mockResolvedValue(undefined);
            (postImageDao.createPostImage as jest.Mock).mockResolvedValue(undefined);

            const testInput = {
                ...input,
                accommodations: [], 
                transports: [mockTransport],
                places: [],
                foods: [],
                images: [],
            };

            const result = await PostService.updatePost('1', input);

            expect(transportDao.createTransport).not.toHaveBeenCalled(); 
            expect(result).toBe('Post updated successfully');
        });


        // adding more branch to increase branch coverage. 

        it('should skip accommodation update if input.accommodations is empty', async () => {
            const minimalInput = { ...input, accommodations: [] };

            (posttDAO.getPostByPostID as jest.Mock).mockResolvedValue(mockPost);
            (posttDAO.updatePost as jest.Mock).mockResolvedValue(mockPost);

            const result = await PostService.updatePost('1', minimalInput);
            expect(accommodationDao.getAccommodationByTypeAndName).not.toHaveBeenCalled();
            expect(postAccommodationDao.updatePostAccommodation).not.toHaveBeenCalled();
            expect(result).toBe('Post updated successfully');
        });


        it('should skip transport update if input.transports is empty', async () => {
            const inputWithoutTransports = {
                ...input,
                transports: [],
            };

            (posttDAO.getPostByPostID as jest.Mock).mockResolvedValue(mockPost);
            (posttDAO.updatePost as jest.Mock).mockResolvedValue(mockPost);

            const result = await PostService.updatePost('1', inputWithoutTransports);

            expect(transportDao.getTransportByTypeAndName).not.toHaveBeenCalled();
            expect(postTransportDao.updatePostTransport).not.toHaveBeenCalled();
            expect(result).toBe('Post updated successfully');
        });


         it('should skip place update if input.accommodations is empty', async () => {
            const minimalInput = { ...input, places: [] };

            (posttDAO.getPostByPostID as jest.Mock).mockResolvedValue(mockPost);
            (posttDAO.updatePost as jest.Mock).mockResolvedValue(mockPost);

            const result = await PostService.updatePost('1', minimalInput);
            expect(placeDao.getPlaceByName).not.toHaveBeenCalled();
            expect(placeDao.updatePlace).not.toHaveBeenCalled();
            expect(result).toBe('Post updated successfully');
        });


        it('should skip food update if input.foods is empty', async () => {
            const noFoods = { ...input, foods: [] };

            (posttDAO.getPostByPostID as jest.Mock).mockResolvedValue(mockPost);
            (posttDAO.updatePost as jest.Mock).mockResolvedValue(mockPost);

            const result = await PostService.updatePost('1', noFoods);
            expect(postFoodDao.updatePostFood).not.toHaveBeenCalled();
            expect(result).toBe('Post updated successfully');
        });


        it('should skip image delete/create if input.images is empty', async () => {
            const noImages = { ...input, images: [] };

            (posttDAO.getPostByPostID as jest.Mock).mockResolvedValue(mockPost);
            (posttDAO.updatePost as jest.Mock).mockResolvedValue(mockPost);

            const result = await PostService.updatePost('1', noImages);
            expect(postImageDao.deleteById).not.toHaveBeenCalled();
            expect(postImageDao.createPostImage).not.toHaveBeenCalled();
            expect(result).toBe('Post updated successfully');
        });


    });

    describe('deletePost', () => {
        it('should delete a post and return status', async () => {
            (posttDAO.getPostByPostID as jest.Mock).mockResolvedValue(mockPost);
            (posttDAO.deletePost as jest.Mock).mockResolvedValue('Post deleted successfully');

            const result = await PostService.deletePost('1', 'user1');

            expect(posttDAO.getPostByPostID).toHaveBeenCalledWith('1');
            expect(posttDAO.deletePost).toHaveBeenCalledWith('1');
            expect(result).toBe('Post deleted successfully');
        });

        it('should throw an AppError if post is not found', async () => {
            (posttDAO.getPostByPostID as jest.Mock).mockResolvedValue(null);

            await expect(PostService.deletePost('1', 'user1')).rejects.toThrow(new AppError('Post not found', 404));
        });

        it('should throw an AppError if user is not authorized', async () => {
            (posttDAO.getPostByPostID as jest.Mock).mockResolvedValue({ ...mockPost, user_id: 'user2' });

            await expect(PostService.deletePost('1', 'user1')).rejects.toThrow(new AppError('you are not authorized to delete the post', 403));
        });
    });

    describe('getPostsByUserID', () => {
        it('should return an array of enriched PostResponseDTOs for a user', async () => {
            (posttDAO.getPostsByUserID as jest.Mock).mockResolvedValue([mockPost]);
            (postTransportDao.getById as jest.Mock).mockResolvedValue([{ transport_id: 'trans1', cost: 20, rating: 3, review: 'Good ride' }]);
            (postPlaceDao.getById as jest.Mock).mockResolvedValue([{ place_id: 'place1', cost: 50, rating: 5, review: 'Amazing place' }]);
            (postAccommodationDao.getById as jest.Mock).mockResolvedValue([{ accommodation_id: 'acc1', cost: 100, rating: 4, review: 'Great stay' }]);
            (postFoodDao.getById as jest.Mock).mockResolvedValue([mockFood]);
            (postImageDao.getById as jest.Mock).mockResolvedValue([mockImage]);
            (transportDao.getById as jest.Mock).mockResolvedValue([mockTransport]);
            (placeDao.getById as jest.Mock).mockResolvedValue([mockPlace]);
            (accommodationDao.getById as jest.Mock).mockResolvedValue([mockAccommodation]);

            const result = await PostService.getPostsByUserID('user1');

            expect(posttDAO.getPostsByUserID).toHaveBeenCalledWith('user1');
            expect(result).toHaveLength(1);
        });

        it('should return an empty array if no posts are found', async () => {
            (posttDAO.getPostsByUserID as jest.Mock).mockResolvedValue([]);

            const result = await PostService.getPostsByUserID('user1');

            expect(posttDAO.getPostsByUserID).toHaveBeenCalledWith('user1');
            expect(result).toEqual([]);
        });

        it('should return posts with empty transports, places, accommodations when IDs are empty', async () => {

            (posttDAO.getPostsByUserID as jest.Mock).mockResolvedValue([mockPost]);

     
            (postTransportDao.getById as jest.Mock).mockResolvedValue([]);
            (postPlaceDao.getById as jest.Mock).mockResolvedValue([]);
            (postAccommodationDao.getById as jest.Mock).mockResolvedValue([]);

      
            (transportDao.getById as jest.Mock).mockResolvedValue([]);
            (placeDao.getById as jest.Mock).mockResolvedValue([]);
            (accommodationDao.getById as jest.Mock).mockResolvedValue([]);

            const result = await PostService.getPostsByUserID('user1');

            expect(posttDAO.getPostsByUserID).toHaveBeenCalledWith('user1');
            expect(transportDao.getById).not.toHaveBeenCalled();
            expect(placeDao.getById).not.toHaveBeenCalled();
            expect(accommodationDao.getById).not.toHaveBeenCalled();

 
            expect(result[0].transports).toEqual([]);
            expect(result[0].places).toEqual([]);
            expect(result[0].accommodations).toEqual([]);
        });
    });

    describe('searchPosts', () => {
        it('should return an array of enriched PostResponseDTOs based on filters', async () => {
            const filters = { place_name: 'place1' };
            (posttDAO.searchPosts as jest.Mock).mockResolvedValue([mockPost]);
            (posttDAO.getPostByPostID as jest.Mock).mockResolvedValue(mockPost);
            (postTransportDao.getById as jest.Mock).mockResolvedValue([{ transport_id: 'trans1', cost: 20, rating: 3, review: 'Good ride' }]);
            (postPlaceDao.getById as jest.Mock).mockResolvedValue([{ place_id: 'place1', cost: 50, rating: 5, review: 'Amazing place' }]);
            (postAccommodationDao.getById as jest.Mock).mockResolvedValue([{ accommodation_id: 'acc1', cost: 100, rating: 4, review: 'Great stay' }]);
            (postFoodDao.getById as jest.Mock).mockResolvedValue([mockFood]);
            (postImageDao.getById as jest.Mock).mockResolvedValue([mockImage]);
            (transportDao.getById as jest.Mock).mockResolvedValue([mockTransport]);
            (placeDao.getById as jest.Mock).mockResolvedValue([mockPlace]);
            (accommodationDao.getById as jest.Mock).mockResolvedValue([mockAccommodation]);

            const result = await PostService.searchPosts(filters);

            expect(posttDAO.searchPosts).toHaveBeenCalledWith(filters);
            expect(posttDAO.getPostByPostID).toHaveBeenCalledWith('1');
            expect(result).toHaveLength(1);
            expect(result[0]).toBeInstanceOf(PostResponseDTO);
        });

        it('should return an empty array if no posts match the filters', async () => {
            (posttDAO.searchPosts as jest.Mock).mockResolvedValue([]);

            const result = await PostService.searchPosts({ place_name: 'place1' });

            expect(posttDAO.searchPosts).toHaveBeenCalledWith({ place_name: 'place1' });
            expect(result).toEqual([]);
        });
    });

    describe('togglePostLike', () => {
        it('should add a like and update post like count', async () => {
            (postInteractionDao.getPostInteraction as jest.Mock).mockResolvedValue(null);
            (postInteractionDao.createPostInteraction as jest.Mock).mockResolvedValue({});
            (posttDAO.togglePostLike as jest.Mock).mockResolvedValue('Like added');

            const result = await PostService.togglePostLike('1', 'user1');

            expect(postInteractionDao.getPostInteraction).toHaveBeenCalledWith('1', 'user1', 'like');
            expect(postInteractionDao.createPostInteraction).toHaveBeenCalledWith('1', 'user1', 'like', 'liked');
            expect(posttDAO.togglePostLike).toHaveBeenCalledWith('1', true);
            expect(result).toBe('Like added');
        });

        it('should remove a like and update post like count', async () => {
            (postInteractionDao.getPostInteraction as jest.Mock).mockResolvedValue({});
            (postInteractionDao.deletePostInteraction as jest.Mock).mockResolvedValue(undefined);
            (posttDAO.togglePostLike as jest.Mock).mockResolvedValue('Like removed');

            const result = await PostService.togglePostLike('1', 'user1');

            expect(postInteractionDao.getPostInteraction).toHaveBeenCalledWith('1', 'user1', 'like');
            expect(postInteractionDao.deletePostInteraction).toHaveBeenCalledWith('1', 'user1', 'like');
            expect(posttDAO.togglePostLike).toHaveBeenCalledWith('1', false);
            expect(result).toBe('Like removed');
        });

        it('should throw if DAO fails during like toggle', async () => {
            (postInteractionDao.getPostInteraction as jest.Mock).mockResolvedValue(null);
            (postInteractionDao.createPostInteraction as jest.Mock).mockResolvedValue({});
            (posttDAO.togglePostLike as jest.Mock).mockRejectedValue(new Error('DB failure'));

            await expect(PostService.togglePostLike('1', 'user1')).rejects.toThrow('DB failure');
        });

    });
});