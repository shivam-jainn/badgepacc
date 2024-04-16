import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";
import { getToken } from "next-auth/jwt";
export async function POST(req:NextRequest,res:NextResponse) {
    try {
        const request = await req.json();
        console.log(request);
        const token = await getToken({req});
        const user = token?.id as string;
        const {badge} = request;
        const issuance_id = Date.now()+user;
        const currentDate = new Date();
        const isoDateString = currentDate.toISOString();
        
        const newToken = await prisma.tokens.create({
            data:{
                user_id: user,
                badge_id:badge,
                issuance_id: issuance_id,
                issuance_time  : isoDateString,
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

