import { Post } from "../Post"

export class PostResponse {
    id: number
    title: string
    description: string
    author: {
        id: number
        username: string
    }

    constructor(post: Post) {
        this.id = post.id
        this.title = post.title
        this.description = post.description
        this.author = {
            id: post.author.id,
            username: post.author.username
        }
    }
}