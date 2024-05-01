import { PostRequest } from "@/interfaces/PostRequest";
import { getToken } from "../utils/get-token";

interface Response {
    status: number,
    data: any
}

export async function createPost(data: PostRequest): Promise<Response> {
    const token = getToken()
    if(!token) {
        return {
            status: 403,
            data: {
                message: "Forbidden",
                status: 403
            }
        }
    }

    const response = await fetch(`api/posts`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    return {
        status: response.status,
        data: await response.json()
    }
}