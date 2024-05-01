export function getToken(): string | null {
    const token = localStorage.getItem("token")

    return token
}