import { prisma } from "@/app/api/[database]/db";
import { NotFoundException } from "../../[exception]/not_found-exception";
import { MyRequest } from "../../[interface]/MyRequest";
import { NextResponse } from "next/server";
import { getToken } from "../../[utils]/getToken";
import { ForbiddenException } from "../../[exception]/forbidden-exception";
import { BadRequestException } from "../../[exception]/bad_request-exception";
import { PostResponse } from "../../[entity]/dto/PostResponse";

export async function GET(request: MyRequest, { params }: { params: { slug: string }}) {
    const slug = parseInt(params.slug)
    if(!slug) {
        return NotFoundException()
    }

    const post = await prisma.post.findUnique({
        where: {
            id: slug
        },
        include: {
            author: true
        }
    })
    if (!post) {
        return BadRequestException(`The post with id ${slug} does not exist.`)
    }

    return NextResponse.json(new PostResponse(post))
}

export async function DELETE(request: MyRequest, { params }: { params: { slug: string }}) {
    const slug = parseInt(params.slug)
    if(!slug) {
        return NotFoundException()
    }

    const token = getToken(request)
    if(!token) {
        return ForbiddenException()
    }

    const post = await prisma.post.findUnique({
        where: {
            id: slug
        }
    })
    if (!post) {
        return BadRequestException(`The post with id ${slug} does not exist.`)
    }

    if(post.authorId !== request.user.sub) {
        return ForbiddenException()
    }

    await prisma.post.delete({
        where: {
            id: slug
        }
    })

    return NextResponse.json({
        message: `The post with id ${slug} was successfully deleted.`,
        status: 200
    })
}