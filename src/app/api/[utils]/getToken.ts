import { verify } from "jsonwebtoken";
import { MyRequest } from "../[interface]/MyRequest";
import { UserProfile } from "../[entity]/dto/UserProfile";

export function getToken(request: MyRequest) {
    try {
        const AuthorizationHeader: String | null = 
            request.headers.has("Authorization") ?
            request.headers.get("Authorization") :
            null
        
        const [type, token] = AuthorizationHeader ? AuthorizationHeader.split(" ") : []
    
        const payload = verify(token, process.env.JWT_SECRET as string) as Object
        request["user"] = payload as UserProfile
    
        return token
    } catch (error) {
        return null
    }
}