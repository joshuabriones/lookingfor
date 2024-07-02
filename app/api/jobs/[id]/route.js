import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req, { params }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Job ID is required", status: 400 });
  }

  try {
    const job = await db.job.findUnique({
      where: { id: id },
      include: {
        employer: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found", status: 404 });
    }

    return NextResponse.json({ job, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Job ID is required", status: 400 });
  }

  const {
    title,
    description,
    deadline,
    salary,
    location,
    requirements,
    image,
  } = await req.json();

  try {
    const job = await db.job.update({
      where: { id: id },
      data: {
        title,
        description,
        deadline,
        salary,
        location,
        requirements,
        image,
      },
    });

    if (!job) {
      return NextResponse.json({ error: "Failed to update job", status: 400 });
    }

    return NextResponse.json({ job, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Job ID is required", status: 400 });
  }

  try {
    const job = await db.job.delete({ where: { id: id } });

    if (!job) {
      return NextResponse.json({ error: "Failed to delete job", status: 400 });
    }

    return NextResponse.json({ job, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
