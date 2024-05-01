import { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";
import { UserProfile } from "../[entity]/dto/UserProfile";

export interface MyRequest extends NextRequest {
    user: UserProfile
}