import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req) {
  const applications = await db.application.findMany({
    where: { isDeleted: false },
    include: {
      job: true,
      user: {
        include: {
          profile: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({ applications, status: 200 });
}
