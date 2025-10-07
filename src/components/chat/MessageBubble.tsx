import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    username: string;
    avatar_url: string | null;
  };
}

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

const MessageBubble = ({ message, isOwnMessage }: MessageBubbleProps) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
      <Avatar className="h-8 w-8 mt-1">
        <AvatarFallback className="text-xs bg-primary text-primary-foreground">
          {message.profiles.username.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'} max-w-[70%]`}>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-xs font-medium text-foreground">
            {message.profiles.username}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatTime(message.created_at)}
          </span>
        </div>
        
        <div
          className={`rounded-2xl px-4 py-2 ${
            isOwnMessage
              ? 'bg-chat-bubble-user text-primary-foreground shadow-glow'
              : 'bg-chat-bubble-other text-foreground'
          }`}
        >
          <p className="text-sm break-words">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
