import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req, { params }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({
      error: "Application ID is required",
      status: 400,
    });
  }

  try {
    const application = await db.application.findUnique({
      where: { id: id },
      include: {
        job: true,
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found", status: 404 });
    }

    return NextResponse.json({ application, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({
      error: "Application ID is required",
      status: 400,
    });
  }

  const { resumeUrl, coverLetter, status } = await req.json();

  try {
    const application = await db.application.update({
      where: { id: id },
      data: {
        resumeUrl,
        coverLetter,
        status,
      },
    });

    if (!application) {
      return NextResponse.json({
        error: "Failed to update application",
        status: 400,
      });
    }

    return NextResponse.json({ application, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({
      error: "Application ID is required",
      status: 400,
    });
  }

  try {
    const application = await db.application.delete({ where: { id: id } });

    if (!application) {
      return NextResponse.json({
        error: "Failed to delete application",
        status: 400,
      });
    }

    return NextResponse.json({ application, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
