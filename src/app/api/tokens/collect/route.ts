import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export async function POST(req:NextRequest,res:NextResponse) {
    try {
        const request = await req.json();
        const body = request.body;
/**
 * 
 * TODO : Decide claim link , do these when you create a bot
 */
        const {username,badge,medium} = body;
     const newToken = await prisma.claimlink.create({
            data:{
                badge_id:badge,
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

