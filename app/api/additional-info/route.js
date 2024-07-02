import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request) {
  const { userId, role, firstName, lastName, image } = await request.json();

  console.log(userId, role, firstName, lastName);

  if (!userId || !role) {
    return NextResponse.json({
      status: 400,
      message: "All fields are required",
    });
  }

  const updatedUser = await db.user.update({
    where: { id: userId },
    data: {
      role: role,
      profile: {
        create: {
          firstName: firstName,
          lastName: lastName,
          image:
            image ||
            `https://ui-avatars.com/api/?name=${firstName}+${lastName}`,
        },
      },
    },
  });

  return NextResponse.json({
    user: updatedUser,
    message: "User profile updated successfully",
    redirectUrl: "/login",
  });
}
