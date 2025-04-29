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



export async function PUT(request: NextRequest) {
  try {
    // const token = await getToken({ req: request, secret });

    // if (!token || !token.id) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID and status are required in request body" },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingRequest = await InvestmentRequest.findById(id);

    if (!existingRequest) {
      return NextResponse.json(
        { error: "Investment request not found" },
        { status: 404 }
      );
    }

    // if (existingRequest.brokerId.toString() !== token.id) {
    //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    // }

    await InvestmentRequest.updateOne({ _id: id }, { $set: { status } });

    const updatedRequest = await InvestmentRequest.findById(id);
    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error("Error updating investment request:", error);
    return NextResponse.json(
      {
        error: "Failed to update investment request",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}