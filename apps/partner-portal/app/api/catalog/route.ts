import { NextResponse } from "next/server";
import { BiotestClientError, listPublishedServices } from "@/lib/biotest-client";

export async function GET() {
  try {
    const services = await listPublishedServices();
    return NextResponse.json({ services });
  } catch (err) {
    if (err instanceof BiotestClientError) {
      return NextResponse.json({ error: err.message, issues: err.issues }, { status: err.status });
    }
    throw err;
  }
}
