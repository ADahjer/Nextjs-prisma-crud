import { NextResponse } from "next/server";

export function GET() {}

export function DELETE() {
  return NextResponse.json({ message: "Deleting note" });
}

export function PUT() {
  return NextResponse.json({ message: "Updating note" });
}
