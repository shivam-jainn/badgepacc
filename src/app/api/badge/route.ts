import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/prisma";
import ResizeImg from "@/utils/resizeimg";
import {UploadBadgeImage} from "@/lib/aws/UploadBadgeImage"
import { getToken } from "next-auth/jwt";

/**
 * @swagger
 * /api/badge:
 *   post:
 *     summary: Create a new badge
 *     description: Endpoint to create a new badge
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the badge
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image of the badge
 *               description:
 *                 type: string
 *                 description: The description of the badge
 *               creator:
 *                 type: string
 *                 description: The creator of the badge
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful
 *   put:
 *     summary: Update a badge
 *     description: Endpoint to update a badge
 *     parameters:
 *       - in: query
 *         name: badge_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the badge to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the badge
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The updated image of the badge
 *               description:
 *                 type: string
 *                 description: The updated description of the badge
 *               creator:
 *                 type: string
 *                 description: The updated creator of the badge
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful
 */



export async function POST(req:NextRequest,res:NextResponse)  {
    try {
        const form = await req.formData();
        console.log(form);
        
        const token = await getToken({req});
        const name = form.get("name") as string;
        const description = form.get("description") as string;
        const image = form.get('image')  as  File | null;;
        const creator = token?.id
        console.log(creator);
        

        if (!name || !description || !creator || !image) {
            throw new Error('Invalid request parameters');
        }
        const imageBuffer = await image.arrayBuffer();
        const resized_image = await ResizeImg(Buffer.from(imageBuffer));
        console.log(resized_image);
        
        const uploadUrl = await UploadBadgeImage(resized_image,creator,name);        
        const currentDate = new Date();
const isoDateString = currentDate.toISOString();

        const newBadge = await prisma.badge.create({
            data:{
                name: name,
                pic: uploadUrl as string,
                description: description,
                creator: { connect: { id: creator } },
                no_of_issued:0,
                time_of_creation:isoDateString
            }
        });
        
        console.log("new badge : " + newBadge);
        

        const response = {
            success : true
        }

        return NextResponse.json(response);
    } catch (error) {
        console.log("error"+error);
        
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
