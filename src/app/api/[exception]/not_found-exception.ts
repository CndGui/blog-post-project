import { NextResponse } from "next/server";

export function NotFoundException(content?: string) {
    return NextResponse.json({
        message: content ? content : "Not found",
        status: 404
    }, {
        status: 404
    })
}