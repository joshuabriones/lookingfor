import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request) {
  const {
    title,
    description,
    deadline,
    salary,
    location,
    requirements,
    image,
    employerId,
  } = await request.json();

  // parse salary to float
  const convertedSalary = parseFloat(salary);
  const formattedDeadline = new Date(deadline).toISOString();

  const job = await db.job.create({
    data: {
      title,
      description,
      deadline: formattedDeadline,
      salary: convertedSalary,
      location,
      requirements,
      image: image || null,
      employerId,
    },
  });

  if (!job) {
    return NextResponse.json({
      message: "Failed to post new job",
      status: 400,
    });
  }

  // db.$disconnect();
  return NextResponse.json({ job, status: 200 });
}
