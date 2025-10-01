export interface Attachment {
    public_id: string;
    url: string;
}

export interface Post {

    _id: string,
    title: string,
    content: string,
    imageUrl: Attachment,
    userId: string,

    createdAt?: Date,
    updatedAt?: Date
}
