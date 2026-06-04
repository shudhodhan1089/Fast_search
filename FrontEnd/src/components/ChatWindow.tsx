import { useEffect, useRef } from "react";
import type { Message } from "@/types/conversation";
import { MessageBubble } from "./MessageBubble";
import { SourceList } from "./SourceList";
import { LoadingMessage } from "./LoadingMessage";

interface ChatWindowProps {
  messages: Message[];
  loading: boolean;
  onFollowUpClick?: (text: string) => void;
}

export function ChatWindow({ messages, loading, onFollowUpClick }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const isEmpty = messages.length === 0 && !loading;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex h-full flex-col overflow-y-auto p-4">
        {isEmpty ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-slate-400">
                Ask anything to start a conversation
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col gap-2 ${
                  message.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <MessageBubble message={message} onFollowUpClick={onFollowUpClick} />
                {message.sources && message.sources.length > 0 && (
                  <div className="max-w-[80%] pl-2">
                    <SourceList sources={message.sources} />
                  </div>
                )}
              </div>
            ))}
            {loading && <LoadingMessage />}
            <div ref={bottomRef} />
          </div>
        )}
      </div>
    </div>
  );
}
