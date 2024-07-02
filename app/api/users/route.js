import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const users = await db.user.findMany({ where: { isDeleted: false } });

  // db.$disconnect();
  return NextResponse.json({ users, status: 200 });
}
