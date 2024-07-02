import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const profiles = await db.profile.findMany({ where: { isDeleted: false } });

  // db.$disconnect();
  return NextResponse.json({ profiles, status: 200 });
}
