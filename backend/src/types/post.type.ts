export type CreatePostInput = {
    user_id: number;
    title: string;
    description: string;
    total_cost: number;
    duration: string;
    effort: string;

    hotels?: Array<{
        hotel_name: string;
        hotel_location: string;
        cost_per_night: number;
        review: string;
    }>;

    transports?: Array<{
        transport_type: string;
        transport_provider: string;
        cost_per_person: number;
        review: string;
    }>;

    places?: Array<{
        place_name: string;
        place_location: string;
        review?: string;
    }>;

    foods?: Array<{
        food_name: string;
        restaurant: string;
        food_cost: number;
        review: string;
    }>;

    category_names?: string[];

    images?: Array<{
        image_url: string;
        caption?: string;
    }>;

    geo_locations?: Array<{
        latitude: number;
        longitude: number;
        location_name: string;
    }>;
}


export type CreatedPost = {
    post_id: number;
    user_id: number;
    title: string;
    description: string;
    total_cost: number;
    duration: string;
    effort: string;
    likes_count: number
    created_at: string;
    updated_at: string;
}

export type getPost = {
    post_id: number;
    user_id: number;
    title: string;
    description: string;
    total_cost: number;
    duration: string;
    effort: string;
    likes_count: number;
    created_at: string;
    updated_at: string;

    hotels?: any[];
    transports?: any[];
    places?: any[];
    foods?: any[];
    categories?: string[];
    images?: any[];
    geo_locations?: any[];
}

export type UpdatePostInput = {
    title: string;
    description: string;
    total_cost: number;
    duration: string;
    effort: string;

    hotels?: Array<{
        hotel_name: string;
        hotel_location: string;
        cost_per_night: number;
        review: string;
    }>;

    transports?: Array<{
        transport_type: string;
        transport_provider: string;
        cost_per_person: number;
        review: string;
    }>;

    places?: Array<{
        place_name: string;
        place_location: string;
        review?: string;
    }>;

    foods?: Array<{
        food_name: string;
        restaurant: string;
        food_cost: number;
        review: string;
    }>;

    category_names?: string[];

    images?: Array<{
        image_url: string;
        caption?: string;
    }>;

    geo_locations?: Array<{
        latitude: number;
        longitude: number;
        location_name: string;
    }>;
};
