import dbConnect from "@/lib/mongo";
import InvestmentRequest from "@/models/investment-request";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID is required in request body" },
        { status: 400 }
      );
    }

    await dbConnect();

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
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
