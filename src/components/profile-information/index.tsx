'use client'

import { getUser } from "@/lib/hooks/get-user"
import { navigate } from "@/lib/utils/navigate"
import { validationToken } from "@/lib/utils/validation-token"
import { User } from "@/interfaces/User"
import { useState, useEffect } from "react"
import { useQuery } from "react-query"
import { Posts } from "./posts"
import { Details } from "./details"

export function ProfileInformation() {
    const [user, setUser] = useState<User | null>(null)
    const { data, isLoading } = useQuery("user", () => getUser())

    useEffect(() => {
        const token = localStorage.getItem("token")

        async function verifyToken() {
            if (token) {
                const validation = await validationToken(token)
                console.log(validation)
                if (!validation) {
                    localStorage.removeItem("token")
                    navigate(`/`)
                }
            }else {
                navigate(`/`)
            }
        }

        verifyToken()

        if (data && data.status == 200) {
            setUser(data.data)
        }
    }, [data, isLoading])

    return (
        <main className="flex-1 grid grid-cols-4 gap-3" >
            <Details user={user} isLoading={isLoading} />

            <Posts user={user} isLoading={isLoading} />
        </main>
    )
}