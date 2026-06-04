import type { Message } from "@/types/conversation";
import { parseAIResponse } from "@/lib/aiResponseParser";

interface MessageBubbleProps {
  message: Message;
  onFollowUpClick?: (text: string) => void;
}

export function MessageBubble({ message, onFollowUpClick }: MessageBubbleProps) {
  const isUser = message.role === "user";
  
  // Parse AI response for assistant messages
  const parsed = !isUser ? parseAIResponse(message.content) : null;
  const displayContent = isUser ? message.content : (parsed?.answer || message.content);
  const followUps = parsed?.followUps || [];

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-slate-900 text-white"
            : "bg-slate-100 text-slate-900"
        }`}
      >
        {displayContent}
      </div>
      
      {/* Render follow-up questions as clickable chips (only for assistant) */}
      {!isUser && followUps.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {followUps.map((q, i) => (
            <button
              key={i}
              onClick={() => onFollowUpClick && onFollowUpClick(q)}
              className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
