import { Header } from "@/components/header";
import { ProfileInformation } from "@/components/profile-information";

export default function Profile() {
    return (
        <div className="p-2 h-screen flex flex-col">
            <Header />

            <ProfileInformation />
        </div>
    )
}