import dbConnect from "@/lib/mongo";
import InvestmentRequest from "@/models/investment-request";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

// Fix: Changed the parameter typing to match Next.js App Router expectations
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await dbConnect();

    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { error: "ID parameter is required" },
        { status: 400 }
      );
    }

    const investmentRequest = await InvestmentRequest.findById(id);

    if (!investmentRequest) {
      return NextResponse.json(
        { error: "Investment request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(investmentRequest);
  } catch (error) {
    console.error("Error fetching investment request:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch investment request",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
