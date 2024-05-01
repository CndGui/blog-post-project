import { getAuth } from "../hooks/get-auth";

export async function validationToken(token: string): Promise<boolean> {
    const response = await getAuth(token)
    console.log(response)
    return response.status == 200
}