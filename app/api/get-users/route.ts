import { NextResponse } from "next/server";
import { getAllUsers } from "@/actions/getUsers";

export async function GET() {
  try {
    console.log("this is running");
    const users = await getAllUsers();
    console.log("this also runs");
    console.log("users", users);
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
