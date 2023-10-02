import { IUser } from "./User";

export interface IPost {
    _id?: string;
    creator?: IUser;
    prompt: string;
    tag: string;
}