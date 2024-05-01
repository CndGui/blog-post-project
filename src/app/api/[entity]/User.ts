import { Post } from "./Post"

export interface User {
    id: number
    username: string
    password: string
    posts: Post[]
}