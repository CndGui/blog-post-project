import { Header } from "@/components/header"
import { SignIn } from "@/components/sign-in"

export default function Login() {
    return (
        <div className="p-2 h-screen flex flex-col">
            <Header />

            <SignIn />
        </div>
    )
}