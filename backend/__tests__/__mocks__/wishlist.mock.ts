import { getWishlistType } from "../../src/types/wishlist.type.ts";

export const mockWishlist: getWishlistType = {
    wishlist_id: 'wish1',
    user_id: 'user1',
    title: "wishlist",
    type: 'place',
    reference_id: 'place-123',
    place_name: "place 1",
    place_latitude: 21.9802,
    place_longitude: 90.1267,
    theme: 'Travel',
    region: 'asia',
    is_public: true,
    note: "my wishlist"
};

export const mockGroup = [{ theme: 'Travel', user_id: 'user1'}];