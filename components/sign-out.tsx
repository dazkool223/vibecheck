import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOutAction } from "@/app/(auth-pages)/login/actions";

export default function SignOutButton() {
  const handleSignOut = () => {
    signOutAction();
  };

  return (
    <Button
      variant="destructive"
      className="flex items-center gap-2"
      onClick={handleSignOut}
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </Button>
  );
}
