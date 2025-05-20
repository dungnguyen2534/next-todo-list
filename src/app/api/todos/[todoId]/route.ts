import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ todoId: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user) throw Error("Unauthorized");

    const { todoId } = await params;
    const body = await req.json();

    // input { data1: "value1", data2: undefined } => { data1: "value1" }
    const newData = Object.fromEntries(
      Object.entries(body).filter(
        ([, value]) => value !== undefined && value !== null,
      ),
    );

    const newTodo = await prisma.todo.update({
      where: { id: todoId, userId: session.user.id },
      data: newData,
    });

    return Response.json(newTodo);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ todoId: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user) throw Error("Unauthorized");

    const { todoId } = await params;

    const deletedTodo = await prisma.todo.delete({
      where: { id: todoId, userId: session.user.id },
    });

    return Response.json(deletedTodo);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
