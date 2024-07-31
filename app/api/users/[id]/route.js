import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req, { params }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({
      error: "User ID is required",
      status: 400,
    });
  }

  try {
    const applications = await db.application.findMany({
      where: { userId: id },
      include: {
        job: true,
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            isDeleted: true,
            profile: true,
          },
        },
      },
    });

    if (!applications.length) {
      return NextResponse.json({
        error: "No applications found for this user",
        status: 404,
      });
    }

    return NextResponse.json({ applications, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
