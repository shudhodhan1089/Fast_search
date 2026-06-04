import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getConversations, getConversation, askQuestion, followUp } from "@/services/api";
import { ChatWindow } from "@/components/ChatWindow";
import { ChatInput } from "@/components/ChatInput";
import { ConversationSidebar } from "@/components/ConversationSidebar";
import type { Conversation, Message } from "@/types/conversation";

function Dashboard() {
  const { user, session, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auth redirect
  useEffect(() => {
    if (user === null && !authLoading) {
      navigate("/auth", { replace: true });
    }
  }, [user, authLoading, navigate]);

  // Fetch conversations on load
  useEffect(() => {
    if (!session) return;
    getConversations(session.access_token)
      .then((data) => {
        setConversations(data);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load conversations");
      });
  }, [session]);

  // Sync activeConversationId from URL
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setActiveConversationId(id);
    }
  }, [searchParams]);

  // Load existing conversation
  const loadConversation = useCallback(
    async (id: string) => {
      if (!session) return;
      setLoading(true);
      try {
        const data = await getConversation(id, session.access_token);
        const mappedMessages: Message[] = data.messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
          sources: msg.sources,
        }));
        setMessages(mappedMessages);
        setActiveConversationId(data.id);
        setSearchParams({ id: data.id });
      } catch (err) {
        console.error(err);
        alert("Failed to load conversation. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [session, setSearchParams]
  );

  // Handle ask / follow-up
  const handleSend = useCallback(
    async (query: string) => {
      if (!session) return;

      const userMessage: Message = { role: "user", content: query };
      setMessages((prev) => [...prev, userMessage]);
      setLoading(true);

      try {
        if (activeConversationId) {
          const data = await followUp(
            { conversationId: activeConversationId, query },
            session.access_token
          );
          const assistantMessage: Message = {
            role: "assistant",
            content: data.answer,
            sources: data.sources,
          };
          setMessages((prev) => [...prev, assistantMessage]);
        } else {
          const data = await askQuestion({ query }, session.access_token);
          const assistantMessage: Message = {
            role: "assistant",
            content: data.answer,
            sources: data.sources,
          };
          setMessages((prev) => [...prev, assistantMessage]);
          setActiveConversationId(data.conversationId);
          setSearchParams({ id: data.conversationId });
          // Refresh conversations list after new conversation creation
          const updatedConversations = await getConversations(session.access_token);
          setConversations(updatedConversations);
        }
      } catch (err) {
        console.error(err);
        alert("Failed to send message. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [activeConversationId, session, setSearchParams]
  );

  // New conversation
  const handleNewConversation = () => {
    setActiveConversationId(null);
    setMessages([]);
    setSearchParams({});
  };

  // Sidebar select
  const handleSelectConversation = (id: string) => {
    if (!id) {
      handleNewConversation();
      return;
    }
    loadConversation(id);
  };

  if (user === null) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      {/* Desktop Sidebar */}
      <div className="hidden h-full w-72 shrink-0 border-r bg-slate-50 md:block">
        <ConversationSidebar
          conversations={conversations}
          activeId={activeConversationId}
          onSelect={handleSelectConversation}
        />
      </div>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-72 bg-slate-50 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <ConversationSidebar
              conversations={conversations}
              activeId={activeConversationId}
              onSelect={(id) => {
                handleSelectConversation(id);
                setSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}

      <div className="flex h-full flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-md p-2 hover:bg-slate-100 md:hidden"
            >
              <Menu className="h-5 w-5 text-slate-700" />
            </button>
            <h1 className="text-lg font-semibold text-slate-900">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-slate-600 sm:inline">
              {user?.email}
            </span>
            <button
              onClick={handleNewConversation}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              New Search
            </button>
            <button
              onClick={() => {
                logout();
                navigate("/auth");
              }}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <ChatWindow
            messages={messages}
            loading={loading}
            onFollowUpClick={handleSend}
          />
          <ChatInput onSend={handleSend} loading={loading} />
        </div>
      </div>


    </div>
  );
}

export default Dashboard;
