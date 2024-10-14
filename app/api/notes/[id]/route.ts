import { prisma } from "@/utils/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

function ApiError(error: Error) {
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      return NextResponse.json({
        error: "Note not found",
        status: 404,
      });
    }
  }

  return NextResponse.json({ error: error.message, status: 500 });
}

export async function GET(request: Request, { params }: Params) {
  try {
    const note = await prisma.note.findFirst({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!note) {
      return NextResponse.json({ error: "Note not found", status: 404 });
    }

    return NextResponse.json(note);
  } catch (error) {
    if (error instanceof Error) return ApiError(error);
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deletedNote = await prisma.note.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json(deletedNote);
  } catch (error) {
    if (error instanceof Error) return ApiError(error);
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { title, content } = await request.json();

    const updatedNote = await prisma.note.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(updatedNote);
  } catch (error) {
    if (error instanceof Error) return ApiError(error);
  }
}
