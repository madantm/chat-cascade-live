import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { toast } from "@/hooks/use-toast";
import ChatRoomList from "@/components/chat/ChatRoomList";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatHeader from "@/components/chat/ChatHeader";
import CreateRoomDialog from "@/components/chat/CreateRoomDialog";

const Chat = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [showCreateRoom, setShowCreateRoom] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <ChatHeader user={user} onSignOut={handleSignOut} />
      
      <div className="flex-1 flex overflow-hidden">
        <ChatRoomList
          userId={user.id}
          selectedRoomId={selectedRoomId}
          onSelectRoom={setSelectedRoomId}
          onCreateRoom={() => setShowCreateRoom(true)}
        />
        
        <ChatMessages
          roomId={selectedRoomId}
          userId={user.id}
        />
      </div>

      <CreateRoomDialog
        open={showCreateRoom}
        onOpenChange={setShowCreateRoom}
        userId={user.id}
        onRoomCreated={(roomId) => {
          setSelectedRoomId(roomId);
          setShowCreateRoom(false);
        }}
      />
    </div>
  );
};

export default Chat;
