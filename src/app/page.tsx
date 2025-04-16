import AddTodoField from "@/components/AddTodoField";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <main className="bg-card m-auto h-4/5 w-[95%] max-w-xl rounded-xl p-5 shadow-sm sm:w-4/5">
      <NavBar />
      <AddTodoField />
    </main>
  );
}
