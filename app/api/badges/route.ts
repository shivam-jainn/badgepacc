import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import {auth} from '@/auth';

export async function POST(request: NextRequest) {
  const session = await auth();

  if(!session) return NextResponse.json({
    message : "User not valid",
    status : 404
  })
  try {
    let formdata;

    // Parse the request form data directly
    try {
      formdata = await request.formData();
      console.log(formdata)
    } catch (error) {
      console.error("Error parsing form data:", error);
      return NextResponse.json({ error: "Failed to parse form data." }, { status: 400 });
    }

  

    // Get file from form data
    const badgeImageLink = formdata.get("badge_pic") as string;

   
    
    let badge;
    try {
      badge = await prisma.badge.create({
        data: {
          name: formdata.get("badgename") as string,
          pic: badgeImageLink as string,
          description: formdata.get("badgedesc") as string,
          no_of_issued: 0,
          time_of_creation: new Date(),
          creator: {
            connect: { email: session.user.email as string},
          },
        },
      });
    } catch (error) {
      console.error("Error storing badge data in database:", error);
      return NextResponse.json({ error: "Failed to store badge information in the database." }, { status: 500 });
    }

    return NextResponse.json({ badge });
  } catch (error) {
    console.error("Unexpected error processing request:", error);
    return NextResponse.json({ error: "An unexpected error occurred while processing the request." }, { status: 500 });
  }
}
