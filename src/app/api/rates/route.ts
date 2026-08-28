import { NextResponse } from "next/server";
import { getLatestRates } from "@/lib/rates-server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getLatestRates();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=720, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "No se pudo obtener el tipo de cambio.";
    return NextResponse.json(
      { error: message },
      { status: 502 },
    );
  }
}
