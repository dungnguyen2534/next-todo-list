import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  loading: boolean;
}

export default function LoadingButton({
  loading,
  children,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button disabled={disabled || loading} {...props}>
      {loading ? <Loader2 className="size-4 animate-spin" /> : children}
    </Button>
  );
}
