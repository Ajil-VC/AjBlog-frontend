import { Genres } from "./types";
import { User } from "./user.interface";

export interface Attachment {
    public_id: string;
    url: string;
}

export interface Post {

    _id: string,
    title: string,
    content: string,
    imageUrl: Attachment | null,
    userId: User,

    genre: Genres,
    likes: string[],

    createdAt?: Date,
    updatedAt?: Date,
    author: {
        _id: string,
        email: string,
        userName: string
    }
}
