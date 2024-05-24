import { prisma } from "@/app/api/[database]/db";
import { UserResponse } from "@/app/api/[entity]/dto/UserResponse";
import { hashSync } from "bcrypt";
import { NextResponse } from "next/server";
import { UserRequest } from "../[entity]/dto/UserRequest";
import { BadRequestException } from "../[exception]/bad_request-exception";
import { MyRequest } from "../[interface]/MyRequest";

export async function GET(request: MyRequest) {
    const users = (await prisma.user.findMany({
        include: {
            posts: {
                include: {
                    author: true
                }
            }
        }
    })).map(user => new UserResponse(user))

    return NextResponse.json(users, {
        status: 200
    })
}

export async function POST(request: MyRequest) {
    try {
        const body: UserRequest = await request.json()
        if (Object.keys(body).length !== 2) {
            return BadRequestException("The body is incorrect.");
        }

        if (!body.hasOwnProperty('username') || !body.hasOwnProperty('password') || !body.username || !body.password) {
            return BadRequestException("The body is incorrect. Only 'username' and 'password' fields are allowed.")
        }

        if (body.username.length > 17) {
            return BadRequestException("The max characters for username's is 16.")
        }

        const usersUsername = (await prisma.user.findMany()).map(user => user.username.toLowerCase())
        if (usersUsername.includes(body.username.toLowerCase())) {
            return BadRequestException("The username is already registered.")
        }

        if (!(/^(?=.*\S).{8,}$/).test(body.password)) {
            return BadRequestException("Your password needs to have more than 8 characters.")
        }

        const password = hashSync(body.password, 10)

        const newUser = await prisma.user.create({
            data: {
                username: body.username,
                password: password
            },
            include: {
                posts: {
                    include: {
                        author: true
                    }
                }
            }
        })
        
        return NextResponse.json(new UserResponse(newUser), {
            status: 201
        })
    } catch (error) {
        return BadRequestException()
    }
}