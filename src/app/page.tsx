import NavBar from "@/components/NavBar";
import TodoList from "@/components/TodoList";
import { auth } from "./auth";
import { redirect } from "next/navigation";
import Container from "./Container";
import { User } from "@prisma/client";

export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <Container>
      <NavBar user={session.user as User} />
      <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent h-5/6 overflow-y-auto">
        <TodoList user={session.user} />
      </div>
    </Container>
  );
}
