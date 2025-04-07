import dbConnect from "@/lib/mongo";
import InvestmentRequest from "@/models/investment-request"; 
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect(); 

    const requests = await InvestmentRequest.find().sort({ createdAt: -1 }); 

    return NextResponse.json(requests);
  } catch (error) {
    console.error("Error fetching investment requests:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch investment requests",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
