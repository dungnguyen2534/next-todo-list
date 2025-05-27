import AddTodoForm from "@/components/AddTodoForm";
import Container from "../Container";
import BackButton from "./BackButton";

export default function Page() {
  return (
    <Container>
      <BackButton />
      <h1 className="-mt-1 text-[2.4rem] font-bold">New Todo</h1>
      <AddTodoForm className="mt-2" />
    </Container>
  );
}
