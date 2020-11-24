import { UserInterface as User } from "./user";


export interface UserClass {
    fetchAllUsers(): Promise<User[]> ;
    findUser(user: User): Promise<User | undefined>;
    saveUser(user: User): void;
}