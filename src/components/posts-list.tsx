'use client'

import { Post } from "@/interfaces/Post"
import { getPosts } from "@/lib/hooks/get-posts"
import { getToken } from "@/lib/utils/get-token"
import { navigate } from "@/lib/utils/navigate"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { NewPostButton } from "./new-post-button"

export function PostsList() {
    const [posts, setPosts] = useState<Post[]>([])
    const { data, isLoading } = useQuery("posts", getPosts)

    useEffect(() => {
        const formattedPosts: Post[] | undefined = data?.data.map((post: Post) => ({
            title: post.title,
            description: post.description,
            author: post.author
        }))

        if (formattedPosts) {
            setPosts(formattedPosts)
        }
    }, [data, isLoading])

    return (
        isLoading
            ? <div className="flex-1 flex items-center justify-center">
                <p>Loading...</p>
            </div>
            : posts.length > 0
                ? <div className={`grid grid-cols-3 gap-3 max-[960px]:grid-cols-2 max-[546px]:grid-cols-1`}>
                    {posts.map((post: Post, index: number) => (
                        <div key={index} className="bg-neutral-800 text-white p-2 h-60 flex flex-col rounded-md">
                            <span className="ml-auto text-sm">{post.author.username}'s post</span>

                            <div>
                                <p className="text-xl">{post.title}</p>

                                <div className="overflow-auto h-40 p-2 bg-neutral-700 rounded-md mt-2">
                                    <p className="break-words">{post.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                : <div className="flex-1 flex flex-col items-center justify-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                        There are no posts yet
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Share your experience now!
                    </p>

                    <NewPostButton color="black" />
                </div>
    )
}