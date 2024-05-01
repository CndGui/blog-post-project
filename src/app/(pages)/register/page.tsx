import { Header } from "@/components/header"
import { SignUp } from "@/components/sign-up"

export default function Register() {
    return (
        <div className="p-2 h-screen flex flex-col">
            <Header />

            <SignUp />
        </div>
    )
}