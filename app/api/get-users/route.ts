import { NextResponse } from "next/server";
import { db } from "@/db";

export async function GET() {
  try {
    console.log("this is running");
    const user = await db.user.findMany({
      select: {
        username: true,
        email: true,
        imageUrl: true,
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
