import Link from "next/link";
import { LoginInformation } from "./login-information";

export function Header() {
    return (
        <header className="flex text-white bg-black p-4 rounded-md items-center">
            <Link href={"/"} >
                <p
                    className="font-semibold text-2xl uppercase"
                >
                    Post blog
                </p>
            </Link>

            <LoginInformation />
        </header>
    )
}