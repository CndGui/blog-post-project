interface Response {
    status: number
    data: any
}

export async function getAuth(access_token: string): Promise<Response> {
    const response = await fetch(`api/auth`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + access_token
        }
    })

    return {
        status: response.status,
        data: await response.json()
    }
}