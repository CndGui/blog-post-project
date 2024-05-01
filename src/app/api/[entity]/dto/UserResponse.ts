import { Post } from "../Post"
import { User } from "../User"
import { PostResponse } from "./PostResponse"

export class UserResponse {
    id: number
    username: string
    posts: PostResponse[]

    constructor(user: User) {
        this.id = user.id
        this.username = user.username
        this.posts = user.posts.map(post => new PostResponse(post))
    }
}