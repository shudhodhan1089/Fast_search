import { useNavigate } from "react-router";
import type { Conversation } from "@/types/conversation";

interface ConversationSidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onClose?: () => void;
}

export function ConversationSidebar({
  conversations,
  activeId,
  onSelect,
  onClose,
}: ConversationSidebarProps) {
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    onSelect(id);
    onClose?.();
  };

  return (
    <div className="flex h-full w-72 flex-col border-r bg-slate-50">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold text-slate-800">Conversations</h2>
        <button
          className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          onClick={() => {
            onSelect("");
            navigate("/");
          }}
        >
          New Search
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {conversations.length === 0 ? (
          <p className="p-2 text-sm text-slate-400">No conversations found.</p>
        ) : (
          <div className="flex flex-col gap-1">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => handleSelect(conversation.id)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  activeId === conversation.id
                    ? "bg-slate-200 text-slate-900"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {conversation.title || "Untitled Conversation"}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
