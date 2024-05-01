'use client'

import { UserRequest } from "@/interfaces/UserRequest"
import { postAuthLogin } from "@/lib/hooks/post-auth-login"
import { navigate } from "@/lib/utils/navigate"
import { validationToken } from "@/lib/utils/validation-token"
import Link from "next/link"
import { useEffect, useState } from "react"

export function SignIn() {
    const [form, setForm] = useState<UserRequest>({
        username: "",
        password: ""
    })

    const [isLoading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const token = localStorage.getItem("token")

        async function verifyToken() {
            if (token) {
                const validation = await validationToken(token)
                if (validation) {
                    navigate(`/`)
                }
            }
        }

        verifyToken()
    }, [])

    const [errorMessage, setErrorMessage] = useState<string | null>()

    async function handleLogin() {
        if (!form.username || !form.password) {
            setLoading(false)
            return setErrorMessage("Fill in all fields.")
        }

        if (form.password.length <= 8) {
            setLoading(false)
            return setErrorMessage("Password must be more than 8 characters.")
        }

        const authResponse = await postAuthLogin(form)
        if (authResponse.status == 200) {
            localStorage.setItem("token", authResponse.data.access_token)
        }

        navigate(`/`)
    }

    return (
        <div className="my-auto flex justify-center items-center">
            <div className="border border-black p-5 rounded-md">
                {errorMessage &&
                    <p className="text-sm text-red-500">{errorMessage}</p>
                }
                <form action={() => {setLoading(true); handleLogin()}} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={form.username}
                            onChange={(e) => {
                                if (errorMessage) setErrorMessage(null)
                                setForm({ ...form, ["username"]: e.target.value })
                            }}
                            className="bg-neutral-200 rounded-md p-1"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={form.password}
                            onChange={(e) => {
                                if (errorMessage) setErrorMessage(null)
                                setForm({ ...form, ["password"]: e.target.value })
                            }}
                            className="bg-neutral-200 rounded-md p-1"
                        />
                    </div>

                    <input
                        type="submit"
                        value={isLoading ? "Loading..." : "Login"}
                        className="bg-blue-600 cursor-pointer text-white rounded-md py-[0.15rem] disabled:bg-neutral-600 disabled:cursor-default"
                        disabled={isLoading}
                    />
                </form>

                <Link href={"/register"}>
                    <p className="text-xs mt-5 text-neutral-600 cursor-pointer hover:text-blue-300">
                        Don't have an account yet? Register by clicking here.
                    </p>
                </Link>
            </div>
        </div>
    )
}