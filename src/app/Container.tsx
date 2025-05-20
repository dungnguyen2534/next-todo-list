import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <main
      className={cn(
        "bg-card m-auto h-7/8 w-[95%] max-w-3xl overflow-y-hidden rounded-xl p-5 shadow-sm sm:w-4/5",
        className,
      )}
    >
      {children}
    </main>
  );
}
