import { prisma } from "@/app/api/[database]/db";
import { compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { UserRequest } from "../../[entity]/dto/UserRequest";
import { BadRequestException } from "../../[exception]/bad_request-exception";
import { MyRequest } from "../../[interface]/MyRequest";

export async function POST(request: MyRequest) {
    try {
        const body: UserRequest = await request.json()
        if (Object.keys(body).length !== 2) {
            return BadRequestException("The body is incorrect.");
        }

        if (!body.hasOwnProperty('username') || !body.hasOwnProperty('password') || !body.username || !body.password) {
            return BadRequestException("The body is incorrect. Only 'username' and 'password' fields are allowed.")
        }

        const user = await prisma.user.findUnique({
            where: {
                username: body.username
            }
        })

        if (!user || !compareSync(body.password, user.password)) {
            return BadRequestException("Username or password is incorrect.")
        }

        const payload = {
            sub: user.id,
            username: user.username
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET as string)

        return NextResponse.json({
            "access_token": token
        })
    } catch (error) {
        return BadRequestException()
    }
}