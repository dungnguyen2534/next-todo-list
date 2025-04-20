import AddTodoForm from "@/components/AddTodoForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-card m-auto h-7/8 w-[95%] max-w-3xl rounded-xl p-5 shadow-sm sm:w-4/5">
      <Button variant="ghost" asChild title="Back to home page">
        <Link href="/">
          <ArrowLeft className="mt-[0.1rem]" /> Back
        </Link>
      </Button>
      <h1 className="-mt-1 text-[2.4rem] font-bold text-gray-800">New Todo</h1>
      <AddTodoForm className="mt-2" />
    </div>
  );
}
