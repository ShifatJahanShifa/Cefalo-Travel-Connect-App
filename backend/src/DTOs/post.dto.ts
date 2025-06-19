export class PostResponseDTO {
  post_id!: number;
  user_id!: number;
  title!: string;
  description!: string;
  total_cost!: number;
  duration!: string;
  effort!: string;
  likes_count!: number;
  created_at!: string;
  updated_at!: string;

  hotels?: any[];
  transports?: any[];
  places?: any[];
  foods?: any[];
  categories?: string[];
  images?: any[];
  geo_locations?: any[];

  constructor(data: Partial<PostResponseDTO>) {
    Object.assign(this, data);
  }
}
