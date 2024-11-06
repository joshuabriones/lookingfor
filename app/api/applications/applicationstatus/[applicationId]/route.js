import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    const { applicationId } = params;

    if (!applicationId) {
        return NextResponse.json({
            error: "Application ID is required",
            status: 400,
        });
    }

    try {
        const { status } = await req.json();

        if (!status) {
            return NextResponse.json({
                error: "Status is required",
                status: 400,
            });
        }

        const updatedApplication = await db.application.update({
            where: { id: applicationId },
            data: { status },
        });

        return NextResponse.json({ application: updatedApplication, status: 200 });
    } catch (error) {
        console.error("Error updating application status:", error);
        return NextResponse.json({ error: error.message, status: 500 });
    }
}
