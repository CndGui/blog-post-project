import { prisma } from "@/app/api/[database]/db";
import { MyRequest } from "../[interface]/MyRequest";
import { NextResponse } from "next/server";
import { BadRequestException } from "../[exception]/bad_request-exception";
import { getToken } from "../[utils]/getToken";
import { ForbiddenException } from "../[exception]/forbidden-exception";
import { PostResponse } from "../[entity]/dto/PostResponse";
import { PostRequest } from "../[entity]/dto/PostRequest";

export async function GET(request: MyRequest) {
    const posts = await prisma.post.findMany({
        include: {
            author: true
        }
    })

    return NextResponse.json(posts.map(post => new PostResponse(post)))
}

export async function POST(request: MyRequest) {
    const token = getToken(request)
    if(!token) {
        return ForbiddenException()
    }

    try {
        const body: PostRequest = await request.json()
        if (Object.keys(body).length !== 2) {
            return BadRequestException("The body is incorrect.");
        }

        if (!body.hasOwnProperty('title') || !body.hasOwnProperty('description') || !body.title || !body.description) {
            return BadRequestException("The body is incorrect. Only 'title' and 'description' fields are allowed.")
        }

        const newPost = await prisma.post.create({
            data: {
                title: body.title,
                description: body.description,
                author: {
                    connect: {
                        id: request.user.sub
                    }
                }
            },
            include: {
                author: true
            }
        })

        return NextResponse.json(new PostResponse(newPost), {
            status: 201
        })
    } catch (error) {
        return BadRequestException()
    }
}