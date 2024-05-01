import { getToken } from "../utils/get-token"
import { getAuth } from "./get-auth"

interface Response {
    status: number
    data: any
}

export async function getUser(id?: number): Promise<Response> {
    if(id) {
        const response = await fetch(`api/users/${id}`, {
            method: "GET"
        })
    
        return {
            status: response.status,
            data: await response.json()
        }
    }else {
        const token = getToken()
        if(!token) {
            return {
                status: 400,
                data: {
                    message: "Bad request",
                    status: 400
                }
            }
        }

        const userProfile = await getAuth(token)
        const response = await fetch(`api/users/${userProfile.data.sub}`, {
            method: "GET"
        })

        return {
            status: response.status,
            data: await response.json()
        }
    }
}