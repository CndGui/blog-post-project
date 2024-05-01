import { User } from "./User"

export interface Post {
    id: number
    title: string
    description: string
    author: {
        id: number
        username: string
        password: string
    }
}