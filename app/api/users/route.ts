import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log("this is running");
    const user = await prisma.user.findMany({
      select: {
        username: true,
        email: true,
        externalUserId: true,
      },
    });
    console.log("this also runs");
    console.log("users", user);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
