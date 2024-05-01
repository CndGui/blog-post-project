import { getToken } from "../utils/get-token"

interface Response {
    status: number
    data: any
}

export async function deleteUser(id: number): Promise<Response> {
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

    const response = await fetch(`api/users/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return {
        status: response.status,
        data: await response.json()
    }
}