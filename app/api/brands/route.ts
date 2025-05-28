import { getBrands } from "@/app/(public)/vehicles/_actions/brand-actions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const brands = await getBrands();
    return NextResponse.json(brands);
  } catch (error) {
    console.error('Error fetching brands:', error);
    return NextResponse.json([{ id: "all", label: "All Brands" }], { status: 500 });
  }
}