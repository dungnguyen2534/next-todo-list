import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const session = await auth();
  if (!session?.user) throw Error("Unauthorized");

  const { userId } = await params;

  const todos = await prisma.todo.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(todos);
}
