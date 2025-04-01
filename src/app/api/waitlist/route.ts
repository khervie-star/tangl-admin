import dbConnect from "@/lib/mongo";
import WaitlistUser from "@/models/waitlist-user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect(); 

    const users = await WaitlistUser.find().sort({ createdAt: -1 });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users", details: error instanceof Error ? error.message : "Unknown error" }, 
      { status: 500 }
    );
  }
}
