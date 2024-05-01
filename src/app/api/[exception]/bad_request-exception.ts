import { NextResponse } from "next/server";

export function BadRequestException(content?: string) {
    return NextResponse.json({
        message: content ? content : "Bad request",
        status: 400
    }, {
        status: 400
    })
}