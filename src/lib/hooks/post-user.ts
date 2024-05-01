import { UserRequest } from "@/interfaces/UserRequest";

interface Response {
    status: number,
    data: any
}

export async function postUser(data: UserRequest): Promise<Response> {
    const response = await fetch(`api/users`, {
        method: "POST",
        body: JSON.stringify(data)
    })

    return {
        status: response.status,
        data: await response.json()
    }
}