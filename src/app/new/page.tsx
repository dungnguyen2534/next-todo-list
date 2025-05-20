import AddTodoForm from "@/components/AddTodoForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Container from "../Container";
import { redirect } from "next/navigation";
import { auth } from "../auth";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <Container>
      <Button variant="link" asChild title="Back to home page">
        <Link href="/">
          <ArrowLeft className="mt-[0.1rem] -ml-3" /> Go back
        </Link>
      </Button>
      <h1 className="-mt-1 text-[2.4rem] font-bold">New Todo</h1>
      <AddTodoForm className="mt-2" />
    </Container>
  );
}
