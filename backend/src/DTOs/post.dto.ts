export class PostResponseDTO {
  post_id!: number;
  user_id!: number;
  title!: string;
  description!: string;
  total_cost!: number;
  duration!: string;
  effort!: string;
  likes_count!: number;
  comments_count!: number;
  created_at!: string;
  updated_at!: string;

  hotels?: any[];
  transports?: any[];
  places?: any[];
  foods?: any[];
  images?: any[];
  

  constructor(data: Partial<PostResponseDTO>) {
    Object.assign(this, data);
  }
}
