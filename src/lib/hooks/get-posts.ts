import { Post } from "@/interfaces/Post";

interface Response {
    status: number,
    data: Post[]
}

export async function getPosts(): Promise<Response> {
    const response = await fetch(`api/posts`, {
        method: "GET"
    })

    return {
        status: response.status,
        data: await response.json()
    }
}