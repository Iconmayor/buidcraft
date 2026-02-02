import { useState } from 'react';
import { Message } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface MessageThreadProps {
  messages: Message[];
  projectId: string;
  onSendMessage: (content: string) => void;
}

export function MessageThread({ messages, projectId, onSendMessage }: MessageThreadProps) {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Send className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No messages yet</p>
            <p className="text-sm text-muted-foreground/70">Start the conversation</p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.senderId === user?.id;
            const isUpdate = message.isUpdate;

            if (isUpdate) {
              return (
                <div key={message.id} className="flex justify-center">
                  <div className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm flex items-center gap-2">
                    <Bell className="w-3.5 h-3.5" />
                    {message.content}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={message.id}
                className={cn(
                  'flex flex-col max-w-[80%]',
                  isOwn ? 'ml-auto items-end' : 'items-start'
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    {isOwn ? 'You' : message.senderName}
                  </span>
                  <span className="text-xs text-muted-foreground/60">
                    {format(new Date(message.timestamp), 'MMM d, h:mm a')}
                  </span>
                </div>
                <div
                  className={cn(
                    'rounded-2xl px-4 py-2.5 text-sm',
                    isOwn
                      ? 'bg-primary text-primary-foreground rounded-tr-md'
                      : 'bg-secondary text-secondary-foreground rounded-tl-md'
                  )}
                >
                  {message.content}
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="min-h-[44px] max-h-32 resize-none"
            rows={1}
          />
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="shrink-0"
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
