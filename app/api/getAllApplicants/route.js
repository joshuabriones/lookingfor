import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req) {
  const users = await db.user.findMany({
    where: { isDeleted: false },
    include: { applications: true, profile: true },
  });

  return NextResponse.json({ users, status: 200 });
}
