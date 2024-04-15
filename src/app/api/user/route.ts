import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";
import {getToken} from 'next-auth/jwt'
export async function PUT(req: NextRequest, res: NextResponse) {
    try {
         const token = await getToken({req})
            console.log(token);

        const request = await req.json();
        
        const { username, name, bio, isOrganisation } = request;
        // Ensure user_id is provided
        if (!token) {
            return NextResponse.error();
        }
        
        // Update user
        const updatedUser = await prisma.user.update({
            where: {
                email: token.email as string,
            },
            data: {
                username,
                name,
                bio,
                isOrganisation
            }
        });

        const response = {
            success: true,
            message: "User updated successfully",
        };

        console.log(updatedUser);
        

        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}
