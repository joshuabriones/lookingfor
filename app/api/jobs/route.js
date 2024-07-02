import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req) {
  const jobs = await db.job.findMany({
    where: { isDeleted: false },
    include: {
      employer: {
        include: {
          profile: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({ jobs, status: 200 });
}
