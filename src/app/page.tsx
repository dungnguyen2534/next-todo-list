import NavBar from "@/components/NavBar";
import TodoList from "@/components/TodoList";
import { getTodos } from "@/lib/actions";

export default async function Home() {
  const todos = await getTodos();
  console.log(todos);

  return (
    <main className="bg-card m-auto h-7/8 w-[95%] max-w-3xl overflow-y-hidden rounded-xl p-5 shadow-sm sm:w-4/5">
      <NavBar />
      <div className="h-5/6 overflow-y-auto">
        <TodoList todosArray={todos} />
      </div>
    </main>
  );
}
