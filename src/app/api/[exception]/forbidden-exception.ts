import { NextResponse } from "next/server";

export function ForbiddenException(content?: string) {
    return NextResponse.json({
        message: content ? content : "Forbidden",
        status: 403
    }, {
        status: 403
    })
}