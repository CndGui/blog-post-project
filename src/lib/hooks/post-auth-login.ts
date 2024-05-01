import { UserRequest } from "@/interfaces/UserRequest";

interface Response {
    status: number
    data: any
}

export async function postAuthLogin(data: UserRequest): Promise<Response> {
    const response = await fetch(`api/auth/login`, {
        method: "POST",
        body: JSON.stringify(data)
    })

    return {
        status: response.status,
        data: await response.json()
    }
}