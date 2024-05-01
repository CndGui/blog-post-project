import { Post } from "./Post"

export interface User {
    id?: number
    username: string
    posts: Post[]
}