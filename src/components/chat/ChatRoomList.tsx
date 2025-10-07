import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Hash } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ChatRoom {
  id: string;
  name: string;
  description: string | null;
}

interface ChatRoomListProps {
  userId: string;
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string) => void;
  onCreateRoom: () => void;
}

const ChatRoomList = ({ userId, selectedRoomId, onSelectRoom, onCreateRoom }: ChatRoomListProps) => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();

    const channel = supabase
      .channel('room-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_rooms'
        },
        () => {
          fetchRooms();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_rooms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRooms(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <Button
          onClick={onCreateRoom}
          className="w-full gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Room
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {loading ? (
            <div className="text-center text-muted-foreground py-4">
              Loading rooms...
            </div>
          ) : rooms.length === 0 ? (
            <div className="text-center text-muted-foreground py-4 px-2 text-sm">
              No rooms yet. Create one to get started!
            </div>
          ) : (
            rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => onSelectRoom(room.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  selectedRoomId === room.id
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "hover:bg-accent text-foreground"
                }`}
              >
                <Hash className="h-4 w-4 flex-shrink-0" />
                <span className="truncate text-sm">{room.name}</span>
              </button>
            ))
          )}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default ChatRoomList;
