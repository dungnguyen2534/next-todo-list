import { SignInButton } from "@/components/AuthButtons";
import Container from "../Container";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (session) redirect("/");

  return (
    <Container className="grid !h-[16rem] !w-[95%] items-center sm:!w-[50%] md:!w-[45%] lg:!w-[35%]">
      <div className="mx-auto mb-5 flex flex-col items-center gap-3">
        <h1 className="text-[2.4rem] font-bold">Welcome!</h1>
        <SignInButton className="mx-auto p-8 text-lg" />
        <p className="text-sm">
          Sign in to access your data on multiple devices.
        </p>
      </div>
    </Container>
  );
}
