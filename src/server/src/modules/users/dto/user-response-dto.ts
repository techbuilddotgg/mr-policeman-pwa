import {Provider, users} from "../../../common/database/tables";
import {User} from "../user";

export class UserResponseDto {
    id: string;
    email: string;
    username: string;
    provider: Provider
    constructor(id: string, email: string, username: string, provider: Provider) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.provider = provider;
    }
    public static fromUser(user:User): UserResponseDto {
        return new UserResponseDto(user.id, user.email, user.username, user.provider);
    }
}