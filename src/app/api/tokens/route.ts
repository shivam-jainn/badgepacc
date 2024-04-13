import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";
export async function POST(req:NextRequest,res:NextResponse) {
    try {
        const request = await req.json();
        const body = request.body;

        const {user,badge} = body;
        const issuance_id = Date.now()+user;
        const newToken = await prisma.tokens.create({
            data:{
                user_id:user,
                badge_id:badge,
                issuance_id: issuance_id,
                issuance_time  : Date(),
            }
        })

       const response = {
            success : true
        }



        return NextResponse.json(response);
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }

}

