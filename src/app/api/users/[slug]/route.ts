import { UserResponse } from "@/app/api/[entity]/dto/UserResponse";
import { prisma } from "@/app/api/[database]/db";
import { NextResponse } from "next/server";
import { BadRequestException } from "../../[exception]/bad_request-exception";
import { ForbiddenException } from "../../[exception]/forbidden-exception";
import { NotFoundException } from "../../[exception]/not_found-exception";
import { MyRequest } from "../../[interface]/MyRequest";
import { getToken } from "../../[utils]/getToken";

export async function GET(request: MyRequest, { params }: { params: { slug: string } }) {
    const slug = parseInt(params.slug)
    if (!slug) {
        return NotFoundException()
    }

    const user = await prisma.user.findUnique({
        where: {
            id: slug
        },
        include: {
            posts: {
                include: {
                    author: true
                }
            }
        }
    })
    if (!user) {
        return BadRequestException(`The user with id ${slug} does not exist.`)
    }

    return NextResponse.json(new UserResponse(user), {
        status: 200
    })
}

export async function DELETE(request: MyRequest, { params }: { params: { slug: string } }) {
    const token = getToken(request)
    if(!token) {
        return ForbiddenException()
    }

    const slug = parseInt(params.slug)
    if (!slug) {
        return NotFoundException()
    }

    if(slug !== request.user.sub) {
        return ForbiddenException()
    }

    const user = await prisma.user.findFirst({
        where: {
            id: slug
        }
    })
    if (!user) {
        return BadRequestException(`The user with id ${slug} does not exist.`)
    }

    await prisma.user.delete({
        where: {
            id: slug
        }
    })

    return NextResponse.json({
        message: `The user with id ${slug} was successfully deleted.`,
        status: 200
    })
}