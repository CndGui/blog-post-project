'use client'

import { PostRequest } from "@/interfaces/PostRequest"
import { createPost } from "@/lib/hooks/create-post"
import { getToken } from "@/lib/utils/get-token"
import { navigate } from "@/lib/utils/navigate"
import { useState } from "react"
import { IoClose } from "react-icons/io5"
import { useQueryClient } from "react-query"

interface Props {
    color: "black" | "white"
}

export function NewPostButton({ color }: Props) {
    const client = useQueryClient()

    const [modal, setModal] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isLoading, setLoading] = useState<boolean>(false)

    const [post, setPost] = useState<PostRequest>({
        title: "",
        description: ""
    })

    async function handleCreate() {
        if (!post.title || !post.description) {
            setLoading(false)
            return setErrorMessage("Fill in all fields.")
        }

        const result = await createPost(post)
        if (result.status == 201) {
            setModal(false)
            setLoading(false)
            setPost({
                title: "",
                description: ""
            })

            client.invalidateQueries("posts")
            client.invalidateQueries("users")
        } else {
            setLoading(false)
            return setErrorMessage(result.data.message)
        }
    }

    return (
        <div>
            <button
                onClick={() => {
                    const token = getToken()
                    if (!token) {
                        return navigate("/login")
                    }

                    setModal(true)
                }}
                className={`${color == "black" ? "bg-black text-white" : "bg-white text-black font-semibold"} p-1 px-3 rounded-md -tracking-tight hover:scale-110 transition-transform duration-75`}
            >
                <span>New Post</span>
            </button>

            {modal &&
                <div className="absolute top-0 left-0 h-screen w-screen z-20 bg-black/70 flex flex-col items-center justify-center">
                    <div className="bg-white text-black p-5 rounded-md relative">
                        <button
                            onClick={() => {
                                setModal(false)
                                setPost({
                                    title: "",
                                    description: ""
                                })
                            }}
                            className="absolute bg-red-700 rounded-md top-1 right-1 hover:bg-red-600">
                            <IoClose size={25} className="text-white" />
                        </button>

                        <div className="flex justify-center">
                            <h1 className="text-2xl font-semibold">Create your post</h1>
                        </div>

                        {errorMessage &&
                            <div className="flex justify-center">
                                <p className="text-sm text-red-500">{errorMessage}</p>
                            </div>
                        }

                        <form action={() => { setLoading(true); handleCreate() }} className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="title">Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    value={post.title}
                                    onChange={(e) => {
                                        if (errorMessage) setErrorMessage(null)
                                        setPost({ ...post, ["title"]: e.target.value })
                                    }}
                                    className="bg-neutral-200 rounded-md p-1 w-96"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    value={post.description}
                                    onChange={(e) => {
                                        if (errorMessage) setErrorMessage(null)
                                        setPost({ ...post, ["description"]: e.target.value })
                                    }}
                                    className="bg-neutral-200 rounded-md p-1 resize-none w-96 h-52"
                                ></textarea>
                            </div>

                            <input
                                type="submit"
                                value={isLoading ? "Loading..." : "Create"}
                                className="bg-blue-600 cursor-pointer text-white rounded-md py-1 disabled:bg-neutral-600 disabled:cursor-default"
                                disabled={isLoading}
                            />
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}