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
            var _a, _b, _c, _d, _e, _f, _g;
            const [post] = yield db('posts')
                .insert({
                user_id: input.user_id,
                title: input.title,
                description: input.description,
                total_cost: input.total_cost,
                duration: input.duration,
                effort: input.effort
            })
                .returning('*');
            const post_id = post.post_id;
            if ((_a = input.hotels) === null || _a === void 0 ? void 0 : _a.length) {
                yield db('post_hotels').insert(input.hotels.map(hotel => (Object.assign({ post_id }, hotel))));
            }
            if ((_b = input.transports) === null || _b === void 0 ? void 0 : _b.length) {
                yield db('post_transports').insert(input.transports.map(transport => (Object.assign({ post_id }, transport))));
            }
            if ((_c = input.places) === null || _c === void 0 ? void 0 : _c.length) {
                yield db('post_places').insert(input.places.map(place => (Object.assign({ post_id }, place))));
            }
            if ((_d = input.foods) === null || _d === void 0 ? void 0 : _d.length) {
                yield db('post_foods').insert(input.foods.map(food => (Object.assign({ post_id }, food))));
            }
            if ((_e = input.category_names) === null || _e === void 0 ? void 0 : _e.length) {
                const categories = yield db('post_categories')
                    .whereIn('category_name', input.category_names)
                    .select('category_id');
                const links = categories.map(({ category_id }) => ({ post_id, category_id }));
                yield db('post_category_links').insert(links);
            }
            if ((_f = input.images) === null || _f === void 0 ? void 0 : _f.length) {
                yield db('post_images').insert(input.images.map(image => (Object.assign({ post_id }, image))));
            }
            if ((_g = input.geo_locations) === null || _g === void 0 ? void 0 : _g.length) {
                yield db('post_geo_locations').insert(input.geo_locations.map(loc => (Object.assign({ post_id }, loc))));
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
                const [hotels, transports, places, foods, images, geo_locations, categories] = yield Promise.all([
                    db('post_hotels').where('post_id', post.post_id),
                    db('post_transports').where('post_id', post.post_id),
                    db('post_places').where('post_id', post.post_id),
                    db('post_foods').where('post_id', post.post_id),
                    db('post_images').where('post_id', post.post_id),
                    db('post_geo_locations').where('post_id', post.post_id),
                    db('post_category_links')
                        .join('post_categories', 'post_category_links.category_id', 'post_categories.category_id')
                        .where('post_category_links.post_id', post.post_id)
                        .pluck('post_categories.category_name'),
                ]);
                return Object.assign(Object.assign({}, post), { hotels,
                    transports,
                    places,
                    foods,
                    images,
                    geo_locations,
                    categories });
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
            const [hotels, transports, places, foods, images, geo_locations, categories] = yield Promise.all([
                db('post_hotels').where('post_id', post.post_id),
                db('post_transports').where('post_id', post.post_id),
                db('post_places').where('post_id', post.post_id),
                db('post_foods').where('post_id', post.post_id),
                db('post_images').where('post_id', post.post_id),
                db('post_geo_locations').where('post_id', post.post_id),
                db('post_category_links')
                    .join('post_categories', 'post_category_links.category_id', 'post_categories.category_id')
                    .where('post_category_links.post_id', post.post_id)
                    .pluck('post_categories.category_name'),
            ]);
            const enrichedPost = Object.assign(Object.assign({}, post), { hotels,
                transports,
                places,
                foods,
                images,
                geo_locations,
                categories });
            return enrichedPost;
        });
    }
    updatePost(post_id, updatedPostData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db('posts').where({ post_id: post_id }).update({
                title: updatedPostData.title,
                description: updatedPostData.description,
                total_cost: updatedPostData.total_cost,
                duration: updatedPostData.duration,
                effort: updatedPostData.effort,
                updated_at: db.fn.now()
            });
            if (updatedPostData.hotels && updatedPostData.hotels.length > 0) {
                yield db('post_hotels').where({ post_id }).del();
                const hotelRecords = updatedPostData.hotels.map(hotel => (Object.assign({ post_id }, hotel)));
                yield db('post_hotels').insert(hotelRecords);
            }
            if (updatedPostData.transports && updatedPostData.transports.length > 0) {
                yield db('post_transports').where({ post_id }).del();
                const transportRecords = updatedPostData.transports.map(transport => (Object.assign({ post_id }, transport)));
                yield db('post_transports').insert(transportRecords);
            }
            if (updatedPostData.places && updatedPostData.places.length > 0) {
                yield db('post_places').where({ post_id }).del();
                const placeRecords = updatedPostData.places.map(place => (Object.assign({ post_id }, place)));
                yield db('post_places').insert(placeRecords);
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
            if (updatedPostData.geo_locations && updatedPostData.geo_locations.length > 0) {
                yield db('post_geo_locations').where({ post_id }).del();
                const geoRecords = updatedPostData.geo_locations.map(geo => (Object.assign({ post_id }, geo)));
                yield db('post_geo_locations').insert(geoRecords);
            }
            if (updatedPostData.category_names && updatedPostData.category_names.length > 0) {
                const categories = yield db('post_categories')
                    .whereIn('category_name', updatedPostData.category_names)
                    .select('category_id');
                const categoryRecords = categories.map(category => ({
                    post_id,
                    category_id: category.category_id,
                }));
                yield db('post_category_links').where({ post_id }).del();
                yield db('post_category_links').insert(categoryRecords);
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
}
const postDAO = new PostDAO();
export default postDAO;
