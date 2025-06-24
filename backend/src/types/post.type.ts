export type CreatePostInput = {
    user_id: string;
    title: string;
    description: string;
    total_cost: number;
    duration: string;
    effort: string;
    categories: string[]

    accommodations?: Array<{
        accommodation_type: string
        accommodation_name: string;
        cost_per_night?: number;
        latitude: number;
        longitude: number;
        cost: number 
        rating: number
        review: string;
    }>;

    transports?: Array<{
        transport_type: string;
        transport_name: string;
        cost_per_person?: number;
        starting_location_name?: string;
        starting_location_latitude?: number;
        starting_location_longitude?: number;
        ending_location_name?: string
        ending_location_latitude?: number;
        ending_location_longitude?: number;
        cost: number 
        rating: number
        review: string;
    }>;

    places?: Array<{
        place_name: string;
        latitude: number;
        longitude: number;
        cost: number;
        rating: number
        review: string;
    }>;

    restaurants?: Array<{
        restaurant_name: string;
        popular_food?: string;
        cost: number;
        rating: number
        review: string;
    }>;

    foods?: Array<{
        food_name: string;
        cost: number;
        rating: number
        review: string;
    }>;

    images?: Array<{
        image_url: string;
        caption?: string;
    }>;
}


export type CreatedPost = {
    post_id: string;
    user_id: string;
    title: string;
    description: string;
    total_cost: number;
    duration: string;
    effort: string;
    categories: string[]
    likes_count: number
    comments_count: number
    created_at: string;
    updated_at: string;
}

export type getPost = {
    post_id: string;
    user_id: string;
    title: string;
    description: string;
    total_cost: number;
    duration: string;
    effort: string;
    categories: string[]
    likes_count: number;
    comments_count: number;
    created_at: string;
    updated_at: string;

    accommodations?: any[];
    transports?: any[];
    places?: any[];
    restaurants?: any[];
    images?: any[];
    foods?: any[]
}

export type UpdatePostInput = {
    title: string;
    description: string;
    total_cost: number;
    duration: string;
    effort: string;
    categories: string[]

    accommodations?: Array<{
        accommodation_type: string
        accommodation_name: string;
        cost_per_night?: number;
        latitude: number;
        longitude: number;
        cost: number 
        rating: number
        review: string;
    }>;

    transports?: Array<{
        transport_type: string;
        transport_name: string;
        cost_per_person?: number;
        starting_location_latitude?: number;
        ending_location_latitude?: number;
        starting_location_longitude?: number;
        ending_location_longitude?: number;
        cost: number 
        rating: number
        review: string;
    }>;

    places?: Array<{
        place_name: string;
        latitude?: number;
        longitude?: number;
        cost: number;
        rating: number
        review: string;
    }>;

    restaurants?: Array<{
        restaurant_name: string;
        popular_food?: string;
        cost: number;
        rating: number;
        review: string;
    }>;

    foods?: Array<{
        food_name: string;
        cost: number;
        rating: number
        review: string;
    }>;

    images?: Array<{
        image_url: string;
        caption?: string;
    }>;
};


export type SearchFilters = {
  title?: string;
  min_cost?: number;
  max_cost?: number;
  transport_type?: string;
  place_name?: string;
  restaurant_name?: string;
  accommodation_type?: string;
}


export type post_interaction = {
    post_interaction_id: string
    post_id: string
    user_id: string
    type: string 
    value: string
    created_at: string;
    updated_at: string;
}