import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { MessageSquare, LogOut } from "lucide-react";

interface ChatHeaderProps {
  user: User;
  onSignOut: () => void;
}

const ChatHeader = ({ user, onSignOut }: ChatHeaderProps) => {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shadow-subtle">
      <div className="flex items-center">
        <MessageSquare className="h-8 w-8 text-primary" />
        <h1 className="ml-3 text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          ChatFlow
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          {user.email}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={onSignOut}
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </header>
  );
};

export default ChatHeader;
