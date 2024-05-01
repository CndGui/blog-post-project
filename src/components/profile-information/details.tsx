import { User } from "@/interfaces/User"
import { deleteUser } from "@/lib/hooks/delete-user"
import { navigate } from "@/lib/utils/navigate"
import { redirect } from "next/navigation"
import { IoLogOutOutline, IoTrashOutline } from "react-icons/io5"

interface Props {
    user: User | null,
    isLoading: boolean
}

export function Details({ user, isLoading }: Props) {
    return (
        isLoading
            ? <div className="col-span-1 border border-black rounded-md mt-2 p-2 flex flex-col items-center justify-center">
                <p>Loading...</p>
            </div>
            : user
            && <div className="col-span-1 border border-black rounded-md mt-2 p-2 flex flex-col">
                <div className="flex items-center">
                    <p className="text-2xl"><b>Username</b>: {user.username}</p>

                    <span
                        onClick={() => {
                            localStorage.removeItem("token")
                            navigate("/")
                        }}
                        className="ml-auto bg-red-700 rounded-md p-1 cursor-pointer hover:bg-red-600"
                    >
                        <IoLogOutOutline size={30} className="text-white" />
                    </span>
                </div>

                <div className="flex-1 my-2 flex items-center justify-center">
                    <p>You have {user.posts.length} {user.posts.length <= 1 ? "post" : "posts"} created!</p>
                </div>

                <div 
                    onClick={async () => {
                        await deleteUser(user.id as number)
                        navigate("/")
                        localStorage.removeItem("token")
                    }}
                    className="bg-red-700 rounded-md flex text-white items-center p-2 justify-center gap-3 mt-auto cursor-pointer hover:bg-red-600"
                >
                    <span>
                        <IoTrashOutline size={30} />
                    </span>

                    <p>Click here to delete your account permanently.</p>
                </div>
            </div>
    )
}