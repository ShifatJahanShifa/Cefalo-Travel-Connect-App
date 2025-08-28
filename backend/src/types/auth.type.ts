import { Role } from "../enums/role";

export type createdUser = {
  user_id: string;
  username: string;
  email: string;
  hashed_password: string;
  role: Role;
  profile_picture_url: string | null;
  bio: string | null;
  phone_no: string | null;
  created_at: Date;
  updated_at: Date;
}

export type signupUser = {
  username: string;
  email: string;
  password: string;
}

export type signinUser = {
  email: string;
  password: string;
}