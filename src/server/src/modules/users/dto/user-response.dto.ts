import {users} from "../../../common/database/tables";
import {User} from "../types/user-type";

export class UserResponseDto {
    id: string;
    email: string;
    username: string;
    constructor(id: string, email: string, username: string) {
        this.id = id;
        this.email = email;
        this.username = username;
    }
    public static fromUser(user:User): UserResponseDto {
        return new UserResponseDto(user.id, user.email, user.username);
    }
}