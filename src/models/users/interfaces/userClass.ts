import { UserInterface as User, UserOrEmail } from "./user";


export interface UserClassInterface {
    fetchAllUsers(): Promise<User[]> ;
    findUser(user: UserOrEmail): Promise<UserOrEmail | undefined>;
    saveUser(user: User): void;
}