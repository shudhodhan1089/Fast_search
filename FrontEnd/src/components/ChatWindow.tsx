import { useEffect, useRef } from "react";
import type { Message } from "@/types/conversation";
import { MessageBubble } from "./MessageBubble";
import { SourceList } from "./SourceList";
import { LoadingMessage } from "./LoadingMessage";

interface ChatWindowProps {
  messages: Message[];
  loading: boolean;
}

export function ChatWindow({ messages, loading }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const isEmpty = messages.length === 0 && !loading;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {isEmpty ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-center text-sm text-slate-400">
              Ask anything to start a conversation
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <div key={index} className="flex flex-col gap-1">
                <MessageBubble message={message} />
                {message.sources && message.sources.length > 0 && (
                  <div className="ml-0 max-w-[80%]">
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
