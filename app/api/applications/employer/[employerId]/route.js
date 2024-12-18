import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { employerId } = params;

    if (!employerId) {
        return NextResponse.json({
            error: "Employer ID is required",
            status: 400,
        });
    }

    try {
        const applications = await db.application.findMany({
            where: {
                isDeleted: false,
                job: {
                    employerId: employerId,
                },
            },
            include: {
                job: true,
                user: {
                    include: {
                        profile: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({ applications, status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message, status: 500 });
    }
}
