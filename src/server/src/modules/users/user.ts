import {users} from "../../common/database/tables";

export type User = typeof users.$inferSelect

export interface UserUpdate extends Omit<User, 'email' | 'id'>{
    password: string | null;
    username: string;
}