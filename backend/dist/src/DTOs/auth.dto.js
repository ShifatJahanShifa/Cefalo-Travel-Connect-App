export class AuthDTO {
    constructor(user, accessToken, refreshToken) {
        this.user_id = user.user_id;
        this.username = user.username;
        this.email = user.email;
        this.role = user.role;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
