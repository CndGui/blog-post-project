'use client'

import { User } from "@/interfaces/User"
import { deletePost } from "@/lib/hooks/delete-post"
import { useState } from "react"
import { IoTrashOutline } from "react-icons/io5"
import { useQueryClient } from "react-query"

interface Props {
    user: User | null,
    isLoading: boolean
}

interface Loading {
    id: number
    isLoading: boolean
}

export function Posts({ user, isLoading }: Props) {
    const client = useQueryClient()

    const [loading, setLoading] = useState<Loading>({
        id: 0,
        isLoading: false
    })

    return (
        isLoading
            ? <div className="col-span-3 border border-black rounded-md mt-2 p-2 flex flex-col items-center justify-center">
                <p>Loading...</p>
            </div>
            : user
            && <div className="col-span-3 border border-black rounded-md mt-2 p-2 flex-1 flex flex-col">
                <h1 className="mx-auto text-4xl font-semibold">Your Posts</h1>

                <div className="grid grid-cols-4 gap-3 overflow-auto">
                    {user.posts?.map((post, index) => (
                        <div key={index} className="bg-neutral-600 p-2 text-white rounded-md flex items-center mt-4">
                            <p className="overflow-hidden mr-2 whitespace-nowrap">{post.title}</p>

                            <button
                                onClick={async () => {
                                    setLoading({
                                        id: post.id as number,
                                        isLoading: true
                                    })
                                    await deletePost(post.id as number)

                                    await client.invalidateQueries("user")
                                    await client.invalidateQueries("posts")
                                    
                                    setLoading({
                                        id: 0,
                                        isLoading: false
                                    })
                                }}
                                disabled={loading.isLoading}
                                className="ml-auto cursor-pointer hover:scale-110 transition-opacity duration-75 flex items-center justify-center disabled:cursor-default disabled:hover:scale-100"
                            >
                                {loading.id == post.id ? loading.isLoading ? <span>...</span> : <IoTrashOutline size={20} /> : <IoTrashOutline size={20} />}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
    )
}