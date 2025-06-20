var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { dbClient } from "../../db/db.js";
import { AppError } from "../../utils/appError.js";
const db = dbClient.getConnection();
class PostDAO {
    createPost(input) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const [post] = yield db('posts')
                .insert({
                user_id: input.user_id,
                title: input.title,
                description: input.description,
                total_cost: input.total_cost,
                duration: input.duration,
                effort: input.effort,
                categories: input.categories
            })
                .returning('*');
            const post_id = post.post_id;
            if ((_a = input.hotels) === null || _a === void 0 ? void 0 : _a.length) {
                // at first search in hotels table
                for (let index = 0; index < ((_b = input.hotels) === null || _b === void 0 ? void 0 : _b.length); index++) {
                    const hotelRecord = yield db('hotels')
                        .select('hotel_id')
                        .where({ hotel_name: input.hotels[index].hotel_name })
                        .first();
                    if (hotelRecord) {
                        yield db('post_hotels').insert({
                            post_id,
                            hotel_id: hotelRecord.hotel_id,
                            cost: input.hotels[index].cost,
                            rating: input.hotels[index].rating,
                            review: input.hotels[index].review,
                        });
                    }
                    else {
                        // later will include creation logic
                    }
                }
            }
            if ((_c = input.transports) === null || _c === void 0 ? void 0 : _c.length) {
                for (let index = 0; index < ((_d = input.transports) === null || _d === void 0 ? void 0 : _d.length); index++) {
                    const transportRecord = yield db('transports')
                        .select('transport_id')
                        .where({ transport_type: input.transports[index].transport_type,
                        transport_provider: input.transports[index].transport_provider
                    })
                        .first();
                    if (transportRecord) {
                        yield db('post_transports').insert({
                            post_id,
                            transport_id: transportRecord.transport_id,
                            cost: input.transports[index].cost,
                            rating: input.transports[index].rating,
                            review: input.transports[index].review,
                        });
                    }
                    else {
                        // later will include creation logic
                    }
                }
            }
            if ((_e = input.places) === null || _e === void 0 ? void 0 : _e.length) {
                for (let index = 0; index < ((_f = input.places) === null || _f === void 0 ? void 0 : _f.length); index++) {
                    const placeRecord = yield db('places')
                        .select('place_id')
                        .where({ place_name: input.places[index].place_name })
                        .first();
                    if (placeRecord) {
                        yield db('post_places').insert({
                            post_id,
                            place_id: placeRecord.place_id,
                            rating: input.places[index].rating,
                            review: input.places[index].review,
                        });
                    }
                    else {
                        // later will include creation logic
                    }
                }
            }
            if ((_g = input.foods) === null || _g === void 0 ? void 0 : _g.length) {
                yield db('post_foods').insert(input.foods.map(food => (Object.assign({ post_id }, food))));
            }
            if ((_h = input.images) === null || _h === void 0 ? void 0 : _h.length) {
                yield db('post_images').insert(input.images.map(image => (Object.assign({ post_id }, image))));
            }
            return post;
        });
    }
    ;
    getAllPosts(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (page - 1) * limit;
            const posts = yield db('posts').select('*').orderBy('created_at', 'desc').limit(limit).offset(offset);
            const enrichedPosts = yield Promise.all(posts.map((post) => __awaiter(this, void 0, void 0, function* () {
                const [hotels, transports, places, foods, images] = yield Promise.all([
                    db('post_hotels').where('post_id', post.post_id),
                    db('post_transports').where('post_id', post.post_id),
                    db('post_places').where('post_id', post.post_id),
                    db('post_foods').where('post_id', post.post_id),
                    db('post_images').where('post_id', post.post_id),
                ]);
                return Object.assign(Object.assign({}, post), { hotels,
                    transports,
                    places,
                    foods,
                    images });
            })));
            return enrichedPosts;
        });
    }
    getPostByPostID(post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield db('posts').select('*').where({ post_id: post_id }).first();
            if (!post) {
                throw new AppError("post not found", 404);
            }
            const [hotels, transports, places, foods, images] = yield Promise.all([
                db('post_hotels').where('post_id', post.post_id),
                db('post_transports').where('post_id', post.post_id),
                db('post_places').where('post_id', post.post_id),
                db('post_foods').where('post_id', post.post_id),
                db('post_images').where('post_id', post.post_id),
            ]);
            const enrichedPost = Object.assign(Object.assign({}, post), { hotels,
                transports,
                places,
                foods,
                images });
            return enrichedPost;
        });
    }
    updatePost(post_id, updatedPostData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            yield db('posts').where({ post_id: post_id }).update({
                title: updatedPostData.title,
                description: updatedPostData.description,
                total_cost: updatedPostData.total_cost,
                duration: updatedPostData.duration,
                effort: updatedPostData.effort,
                updated_at: db.fn.now()
            });
            if (updatedPostData.hotels && updatedPostData.hotels.length > 0) {
                for (let index = 0; index < ((_a = updatedPostData.hotels) === null || _a === void 0 ? void 0 : _a.length); index++) {
                    const hotelRecord = yield db('hotels')
                        .select('hotel_id')
                        .where({ hotel_name: updatedPostData.hotels[index].hotel_name })
                        .first();
                    if (hotelRecord) {
                        yield db('post_hotels').where({ post_id: post_id, hotel_id: hotelRecord.hotel_id }).update({
                            cost: updatedPostData.hotels[index].cost,
                            rating: updatedPostData.hotels[index].rating,
                            review: updatedPostData.hotels[index].review,
                        });
                    }
                    else {
                        // later will include creation logic
                    }
                }
            }
            if (updatedPostData.transports && updatedPostData.transports.length > 0) {
                for (let index = 0; index < ((_b = updatedPostData.transports) === null || _b === void 0 ? void 0 : _b.length); index++) {
                    const transportRecord = yield db('transports')
                        .select('transport_id')
                        .where({ transport_type: updatedPostData.transports[index].transport_type,
                        transport_provider: updatedPostData.transports[index].transport_provider
                    })
                        .first();
                    if (transportRecord) {
                        yield db('post_transports').where({ post_id: post_id,
                            transport_id: transportRecord.transport_id, }).update({
                            cost: updatedPostData.transports[index].cost,
                            rating: updatedPostData.transports[index].rating,
                            review: updatedPostData.transports[index].review,
                        });
                    }
                    else {
                        // later will include creation logic
                    }
                }
            }
            if (updatedPostData.places && updatedPostData.places.length > 0) {
                for (let index = 0; index < ((_c = updatedPostData.places) === null || _c === void 0 ? void 0 : _c.length); index++) {
                    const placeRecord = yield db('places')
                        .select('place_id')
                        .where({ place_name: updatedPostData.places[index].place_name })
                        .first();
                    if (placeRecord) {
                        yield db('post_places').where({ post_id,
                            place_id: placeRecord.place_id, }).update({
                            rating: updatedPostData.places[index].rating,
                            review: updatedPostData.places[index].review,
                        });
                    }
                    else {
                        // later will include creation logic
                    }
                }
            }
            if (updatedPostData.foods && updatedPostData.foods.length > 0) {
                yield db('post_foods').where({ post_id }).del();
                const foodRecords = updatedPostData.foods.map(food => (Object.assign({ post_id }, food)));
                yield db('post_foods').insert(foodRecords);
            }
            if (updatedPostData.images && updatedPostData.images.length > 0) {
                yield db('post_images').where({ post_id }).del();
                const imageRecords = updatedPostData.images.map(img => (Object.assign({ post_id }, img)));
                yield db('post_images').insert(imageRecords);
            }
            return "successfully updated post";
        });
    }
    deletePost(post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const postDeleted = yield db("posts").where({ post_id: post_id }).del();
            return "successfully deleted the post";
        });
    }
    getPostsByUserID(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            // i am not applying pagination rn
            const posts = yield db("posts").select('*').where({ user_id: user_id }).orderBy('created_at', 'desc');
            const enrichedPosts = yield Promise.all(posts.map((post) => __awaiter(this, void 0, void 0, function* () {
                const [hotels, transports, places, foods, images] = yield Promise.all([
                    db('post_hotels').where('post_id', post.post_id),
                    db('post_transports').where('post_id', post.post_id),
                    db('post_places').where('post_id', post.post_id),
                    db('post_foods').where('post_id', post.post_id),
                    db('post_images').where('post_id', post.post_id),
                ]);
                return Object.assign(Object.assign({}, post), { hotels,
                    transports,
                    places,
                    foods,
                    images });
            })));
            return enrichedPosts;
        });
    }
}
const postDAO = new PostDAO();
export default postDAO;
