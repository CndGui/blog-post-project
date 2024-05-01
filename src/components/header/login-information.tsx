'use client'

import { getAuth } from "@/lib/hooks/get-auth"
import Link from "next/link"
import { useEffect, useState } from "react"
import { NewPostButton } from "../new-post-button"

export function LoginInformation() {
    const [token, setToken] = useState<string | null>(null)
    const [modal, setModal] = useState<string | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        setToken(token)
    }, [])

    async function verifyToken() {
        if(token) {
            const response = await getAuth(token)
            if(response.status !== 200) {
                localStorage.removeItem("token")
            }
        }
    }

    return (
        token
            ? <div className="ml-auto flex gap-5 items-center">
                <Link
                    onClick={() => verifyToken()} 
                    href={"/profile"}
                >
                    <span className="hover:text-zinc-400 cursor-pointer">My profile</span>
                </Link>

                <NewPostButton color="white" />
            </div>
            : <div className="ml-auto flex gap-5">
                <Link href={"/register"}>
                    <span className="hover:text-zinc-400 cursor-pointer">Sign Up</span>
                </Link>
                <Link href={"/login"}>
                    <span className="hover:text-zinc-400 cursor-pointer">Login</span>
                </Link>
            </div>
    )
}