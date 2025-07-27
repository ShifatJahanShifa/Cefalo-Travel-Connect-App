export class PostResponseDTO {
  post_id!: string;
  user_id!: string;
  title!: string;
  description!: string;
  total_cost!: number;
  duration!: string;
  effort!: string;
  likes_count!: number;
  comments_count!: number;
  created_at!: string;
  updated_at!: string;

  accommodations?: any[];
  transports?: any[];
  places?: any[];
  restaurants?: any[];
  images?: any[];
  foods?: any[]
  

  constructor(data: Partial<PostResponseDTO>) {
    Object.assign(this, data);
  }
}
