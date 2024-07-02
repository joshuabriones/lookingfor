import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const employerId = searchParams.get("employerId");

  const jobs = await db.job.findMany({
    where: { isDeleted: false, employerId: employerId },
    include: {
      employer: {
        include: {
          profile: true,
        },
      },
      applications: true,
    },
    orderBy: { deadline: "desc" },
  });

  return NextResponse.json({
    jobs,
    status: 200,
  });
}
