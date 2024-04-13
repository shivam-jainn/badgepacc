import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/prisma";
import ResizeImg from "@/utils/resizeimg";
import {UploadBadgeImage} from "@/lib/aws/UploadBadgeImage"


export async function POST(req:NextRequest,res:NextResponse)  {
    try {
        const request = await req.json();
        const body = request.body;
        
        const {name,image,description,creator} = body;
        
        const resized_image = await ResizeImg(image);

        const uploadUrl = await UploadBadgeImage(resized_image,creator,name);        


        const newBadge = await prisma.badge.create({
            data:{
                name: name,
                pic: uploadUrl as string,
                description: description,
                creator: creator,
                no_of_issued:0,
                time_of_creation:Date(),
            }
        });
        
        const response = {
            success : true
        }

        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.error();
    }
}
export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const request = await req.json();
        const body = request.body;
        const updates: any = {};
        
        const { badge_id, name, image, description, creator } = body;

        let uploadUrl: string | undefined;

        if (image) {
            const resizedImage = await ResizeImg(image);
            uploadUrl = await UploadBadgeImage(resizedImage, creator, name);
     
            if(uploadUrl) updates.pic = uploadUrl;
            else return NextResponse.error();
        }


        if (name) {
            updates.name = name;
        }

        if (description) {
            updates.description = description;
        }


        if (Object.keys(updates).length > 0) {
            const updatedBadge = await prisma.badge.update({
                where: {
                    id: badge_id
                },
                data: updates
            });
        }

        const response = {
            success: true
        }

        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.error();
    }
}
