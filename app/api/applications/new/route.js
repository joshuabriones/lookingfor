import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request) {
  const { jobId, userId, resumeUrl, coverLetter } = await request.json();

  try {
    // Check if the user has already applied for this job
    const existingApplication = await db.application.findFirst({
      where: {
        jobId: jobId,
        userId: userId,
      },
    });

    if (existingApplication) {
      return NextResponse.json({
        message: "You have already applied for this job",
        status: 403,
      });
    }

    // Create a new application
    const application = await db.application.create({
      data: {
        jobId,
        userId,
        resumeUrl,
        coverLetter,
      },
    });

    if (!application) {
      return NextResponse.json({
        message: "Failed to create application",
        status: 400,
      });
    }

    return NextResponse.json({ application, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
