export type CreatePostInput = {
    user_id: number;
    title: string;
    description: string;
    total_cost: number;
    duration: string;
    effort: string;
    categories: string

    hotels?: Array<{
        hotel_name: string;
        cost_per_night?: number;
        latitude?: number;
        longitude?: number;
        cost: number 
        rating: number
        review: string;
    }>;

    transports?: Array<{
        transport_type: string;
        transport_provider: string;
        cost_per_person?: number;
        starting_point_latitude?: number;
        ending_point_latitude?: number;
        starting_point_longitude?: number;
        ending_point_longitude?: number;
        cost: number 
        rating: number
        review: string;
    }>;

    places?: Array<{
        place_name: string;
        latitude?: number;
        longitude?: number;
        rating: number
        review: string;
    }>;

    foods?: Array<{
        food_name: string;
        restaurant: string;
        food_cost: number;
        review: string;
    }>;

    images?: Array<{
        image_url: string;
        caption?: string;
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
    categories: string
    likes_count: number
    comments_count: number
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
    categories: string
    likes_count: number;
    comments_count: number;
    created_at: string;
    updated_at: string;

    hotels?: any[];
    transports?: any[];
    places?: any[];
    foods?: any[];
    images?: any[];
}

export type UpdatePostInput = {
    title: string;
    description: string;
    total_cost: number;
    duration: string;
    effort: string;
    categories: string

    hotels?: Array<{
        hotel_name: string;
        cost_per_night?: number;
        latitude?: number;
        longitude?: number;
        cost: number 
        rating: number
        review: string;
    }>;

    transports?: Array<{
        transport_type: string;
        transport_provider: string;
        cost_per_person?: number;
        starting_point_latitude?: number;
        ending_point_latitude?: number;
        starting_point_longitude?: number;
        ending_point_longitude?: number;
        cost: number 
        rating: number
        review: string;
    }>;

    places?: Array<{
        place_name: string;
        latitude?: number;
        longitude?: number;
        rating: number
        review: string;
    }>;

    foods?: Array<{
        food_name: string;
        restaurant: string;
        food_cost: number;
        review: string;
    }>;

    images?: Array<{
        image_url: string;
        caption?: string;
    }>;
};
