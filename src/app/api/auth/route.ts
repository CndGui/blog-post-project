import { NextResponse } from "next/server";
import { BadRequestException } from "../[exception]/bad_request-exception";
import { ForbiddenException } from "../[exception]/forbidden-exception";
import { getToken } from "../[utils]/getToken";
import { MyRequest } from "../[interface]/MyRequest";

export async function GET(request: MyRequest) {
    const token = getToken(request)
    if (!token) {
        return ForbiddenException()
    }

    try {
        return NextResponse.json(request.user)
    } catch (error) {
        return BadRequestException(`The token provided for authentication has some issue.`)
    }
}