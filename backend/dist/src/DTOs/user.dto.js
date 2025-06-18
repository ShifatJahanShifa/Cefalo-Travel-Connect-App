export class UserDTO {
    constructor(user) {
        this.user_id = user.user_id;
        this.username = user.username;
        this.email = user.email;
        this.role = user.role;
        this.profile_picture_url = user.profile_picture_url;
        this.bio = user.bio;
    }
}
