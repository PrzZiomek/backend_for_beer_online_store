
export interface UserInterface {
    type: "userInterface";
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
}

export interface UserEmail {
    type: "userEmail";
    email: string;
}

export type UserOrEmail = UserInterface | UserEmail;